import React, { useState, useEffect, useRef } from 'react';
import './GameBoard.css';
import CardHand from './CardHand';
import Button from './Button';

export default function GameBoard({
  shuffledCards,
  numCardsPlayed,
  setNumCardsPlayed,
  betAmount,
  setBankTotal,
  weHaveAWinner,
  setWeHaveAWinner,
  setWinnerName,
}) {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [dealerFlip, setDealerFlip] = useState(false); //flips dealers hole card & retotals
  const [completeDealerHand, setCompleteDealerHand] = useState(false);

  let playerHandTotal = playerHand.reduce((total, obj) => obj.value + total, 0);
  let dealerTrueTotal = dealerHand.reduce((total, obj) => obj.value + total, 0);
  let dealerHiddenTotal = dealerHand
    .slice(1)
    .reduce((total, obj) => obj.value + total, 0);

  // ************************************ INITIAL DEAL ************************************
  const dealInitialHand = () => {
    let cardsForInitialDeal = shuffledCards.slice(
      numCardsPlayed,
      numCardsPlayed + 4
    );

    let dealerTempArray = [];
    for (let i = 0; i < 4; i += 2) {
      dealerTempArray.push(cardsForInitialDeal[i]);
    }

    let playerTempArray = [];
    for (let i = 1; i < 4; i += 2) {
      playerTempArray.push(cardsForInitialDeal[i]);
    }

    //aces testing code
    // setDealerHand([
    //   {
    //     value: 11,
    //     'secondary-value': 1,
    //     url: '/spade-A.svg',
    //     type: 'ace',
    //   },
    //   {
    //     value: 11,
    //     'secondary-value': 1,
    //     url: '/heart-A.svg',
    //     type: 'ace',
    //   },
    // ]);

    setDealerHand(dealerTempArray);
    setPlayerHand(playerTempArray);
    setNumCardsPlayed((prev) => prev + 4);
  };

  useEffect(() => {
    dealInitialHand();
  }, []);

  useEffect(() => {
    // handles if dealer gets 2 aces on inital deal
    if (dealerHand.length > 0) {
      if (dealerHand[0].value === 11 && dealerHand[1].value === 11) {
        dealerHand[0].value = 1;
      }
    }
  }, [dealerHand]);

  // ************************************ SET & DISPLAY HAND TOTALS ************************************
  useEffect(() => {
    // setPlayerTotal(21); //testing blackjack payout
    setPlayerTotal(playerHandTotal);
  }, [playerHand]);

  // sets and displays dealers hand - true hand total only after player selects "Stay" and dealerFlip is triggered
  useEffect(() => {
    dealerFlip
      ? setDealerTotal(dealerTrueTotal)
      : setDealerTotal(dealerHiddenTotal);
  }, [dealerHand, dealerFlip]);

  const handleAces = (whosHandTotal, whosHand, setWhosTotal) => {
    console.log('handle aces ran');
    let aces = [];
    let newTotal = whosHandTotal;
    let numCardsToAdjust;

    whosHand.map((card) => {
      if (card.type === 'ace') {
        aces.push(card);
      }
    });

    if (aces.length === 1 && newTotal > 21) {
      setWhosTotal(whosHandTotal - aces.length * 10);
    }

    if (aces.length > 1) {
      numCardsToAdjust = aces.length - 1;
      newTotal = whosHandTotal - numCardsToAdjust * 10;
      setWhosTotal(newTotal);
    }

    if (aces.length > 1 && newTotal > 21) {
      setWhosTotal(whosHandTotal - aces.length * 10);
    }
  };

  // handles player aces
  useEffect(() => {
    handleAces(playerHandTotal, playerHand, setPlayerTotal);
  }, [playerHand]);

  // ************************************ HANDLE HIT & STAY BUTTONS ************************************

  const handleStay = () => {
    setDealerFlip(true);
    setCompleteDealerHand(true);

    let tempDealerTotal = dealerTrueTotal;
    let tempNumCardsPlayed = numCardsPlayed;
    let newCardsToBeDealt = [];

    // set cards to be dealt to dealer after "Stay" clicked
    while (tempDealerTotal < 17) {
      tempNumCardsPlayed++;

      //changes ace to 1 if new cards dealt pushes total over 21 (hopefully)
      if (
        dealerHand[0].value === 11 ||
        (dealerHand[1].value === 11 &&
          tempDealerTotal + shuffledCards[tempNumCardsPlayed].value > 21)
      ) {
        tempDealerTotal = tempDealerTotal - 10;
        newCardsToBeDealt.push(shuffledCards[tempNumCardsPlayed]);
      }

      //deals with Aces, hopefully!
      if (
        shuffledCards[tempNumCardsPlayed].value === 11 &&
        tempDealerTotal + shuffledCards[tempNumCardsPlayed].value > 21
      ) {
        shuffledCards[tempNumCardsPlayed].value = 1;
        newCardsToBeDealt.push(shuffledCards[tempNumCardsPlayed]);
      } else {
        newCardsToBeDealt.push(shuffledCards[tempNumCardsPlayed]);
      }

      tempDealerTotal =
        tempDealerTotal + shuffledCards[tempNumCardsPlayed].value;
    }

    // display cards dealt to dealer after stay
    setTimeout(() => {
      setNumCardsPlayed(tempNumCardsPlayed);
      newCardsToBeDealt.map((card, index) => {
        setTimeout(() => {
          setDealerHand((prev) => [...prev, card]);
        }, 1000 * index);
      });
    }, 1000);

    // once dealer hits or exceeds 17, score the round
    setTimeout(() => {
      if (tempDealerTotal >= 17) {
        dealerTrueTotal = tempDealerTotal; //must do this because dealerTotal doesn't update fast enough
        scoreTheRound();
      }
    }, 1000 * newCardsToBeDealt.length);
  };

  const handleHitMe = () => {
    setNumCardsPlayed((prev) => prev + 1);
    setPlayerHand((prev) => [...prev, shuffledCards[numCardsPlayed]]);
  };

  // ************************************ SCORING ************************************

  const handleBet = {
    playerWins: (prev) => prev + betAmount,
    dealerWins: (prev) => prev - betAmount,
    push: (prev) => prev,
    blackJack: (prev) => prev + Math.ceil(betAmount * 1.5),
  };

  // check if player hits 21 or busts with every hit
  useEffect(() => {
    if (playerTotal === 21 && playerHand.length === 2) {
      scoreBlackJack();
    } else if (playerTotal === 21) {
      //keep to auto score when player hits to 21
      scoreTheRound();
    } else if (playerTotal > 21) {
      scoreTheRound();
    }
  }, [playerTotal]);

  const scoreBlackJack = () => {
    if (playerTotal === 21 && dealerTrueTotal === 21) {
      declareWinner('Push', handleBet.push);
    } else if (playerTotal === 21 && dealerTrueTotal !== 21) {
      declareWinner('BLACKJACK!!!', handleBet.blackJack);
    }
  };

  const scoreTheRound = () => {
    if (playerTotal === 21 && dealerTrueTotal === 21) {
      declareWinner('Push!', handleBet.push);
    } else if (playerTotal === 21 && dealerTrueTotal !== 21) {
      declareWinner('You win!', handleBet.playerWins);
    } else if (playerTotal > 21) {
      declareWinner('You busted, dealer wins.', handleBet.dealerWins);
    } else if (dealerTrueTotal === 21) {
      declareWinner('Dealer wins.', handleBet.dealerWins);
    } else if (dealerTrueTotal > 21) {
      declareWinner('Dealer busted, you win!', handleBet.playerWins);
    } else if (dealerTrueTotal > playerTotal) {
      declareWinner('Dealer wins.', handleBet.dealerWins);
    } else if (dealerTrueTotal < playerTotal) {
      declareWinner('You win!', handleBet.playerWins);
    } else if (dealerTrueTotal === playerTotal) {
      declareWinner('Push!', handleBet.push);
    }
  };

  // ************************************ DECLARE WINNER ************************************
  const declareWinner = (winnerName, bet) => {
    setWinnerName(winnerName);
    setTimeout(() => {
      setDealerFlip(true);
    }, 500);

    setTimeout(() => {
      setBankTotal(bet);
      setWeHaveAWinner(true);
    }, 1500);
  };

  return (
    <section className='game-board'>
      {!weHaveAWinner && (
        <div className='game-btns'>
          {!dealerFlip && (
            <>
              <Button title='Hit Me' size='btn-lg' clickHandler={handleHitMe} />
              <Button title='Stay' size='btn-lg' clickHandler={handleStay} />
            </>
          )}
        </div>
      )}

      <div className='card-hands'>
        <CardHand
          shuffledCards={shuffledCards}
          playerOrDealer={dealerHand}
          player='Dealer'
          handTotal={dealerTotal}
          dealerFlip={dealerFlip}
        />
        <CardHand
          shuffledCards={shuffledCards}
          playerOrDealer={playerHand}
          player='Player'
          handTotal={playerTotal}
        />
      </div>
    </section>
  );
}
