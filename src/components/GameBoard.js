import React, { useState, useEffect } from 'react';
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
  setOfferDoubleDown,
  dealDoubleDown,
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

    let playerTempArray = [];
    for (let i = 0; i < 4; i += 2) {
      playerTempArray.push(cardsForInitialDeal[i]);
    }

    let dealerTempArray = [];
    for (let i = 1; i < 4; i += 2) {
      dealerTempArray.push(cardsForInitialDeal[i]);
    }

    // for testing
    setPlayerHand([
      {
        value: 2,
        url: '/club-2.svg',
      },
      {
        value: 8,
        url: '/heart-8.svg',
      },
    ]);

    setDealerHand(dealerTempArray);
    // setPlayerHand(playerTempArray);
    setNumCardsPlayed((prev) => prev + 4);
  };

  useEffect(() => {
    dealInitialHand();
  }, []);

  useEffect(() => {
    // handles if 2 aces get dealt on inital deal
    if (dealerHand.length > 0) {
      if (dealerHand[0].value === 11 && dealerHand[1].value === 11) {
        dealerHand[0].value = 1;
      }
    }
  }, [dealerHand]);

  useEffect(() => {
    // handles if 2 aces get dealt on inital deal
    if (playerHand.length > 0) {
      if (playerHand[0].value === 11 && playerHand[1].value === 11) {
        playerHand[0].value = 1;
      }
    }
    playerHandTotal = playerHand.reduce((total, obj) => obj.value + total, 0);
  }, [playerHand]);

  // ************************************ HANDLE DOUBLE DOWN ************************************

  useEffect(() => {
    // handles whether to offer double down button
    if (playerHand.length === 2) {
      if (playerHandTotal > 8 && playerHandTotal < 12) {
        setOfferDoubleDown(true);
      }
    } else if (playerHand.length > 2) {
      setOfferDoubleDown(false);
    }
  }, [playerHand]);

  useEffect(() => {
    // deals double down card & scores game
    if (dealDoubleDown === true) {
      handleAces(playerHand, playerHandTotal, setPlayerHand);
      handleStay();
    }
  }, [dealDoubleDown]);

  // ************************************ SET & DISPLAY HAND TOTALS ************************************
  // sets and displays players hand total
  useEffect(() => {
    setPlayerTotal(playerHandTotal);
  }, [playerHand]);

  // sets and displays dealers hand total
  useEffect(() => {
    dealerFlip
      ? setDealerTotal(dealerTrueTotal)
      : setDealerTotal(dealerHiddenTotal);
  }, [dealerHand, dealerFlip]);

  // ************************************ HANDLE ACES ************************************

  const handleAces = (hand, handTotal, setHand) => {
    setNumCardsPlayed((prev) => prev + 1);
    let findAce = hand.find((card) => card.value === 11);

    if (
      handTotal + shuffledCards[numCardsPlayed].value > 21 &&
      findAce !== undefined
    ) {
      //handle changing value of initally dealt ace if needed
      findAce.value = 1;
      setHand((prev) => [...prev, shuffledCards[numCardsPlayed]]);
    } else if (
      //handle changing value of currently dealt ace if needed
      shuffledCards[numCardsPlayed].value === 11 &&
      handTotal + shuffledCards[numCardsPlayed].value > 21
    ) {
      shuffledCards[numCardsPlayed].value = 1;
      setHand((prev) => [...prev, shuffledCards[numCardsPlayed]]);
    } else {
      setHand((prev) => [...prev, shuffledCards[numCardsPlayed]]);
    }
  };

  // ************************************ HANDLE HIT BUTTON ************************************

  const handleHitMe = () => {
    handleAces(playerHand, playerHandTotal, setPlayerHand);
  };

  // ************************************ HANDLE STAY BUTTON ************************************

  const handleStay = () => {
    setDealerFlip(true);
    setCompleteDealerHand(true);

    if (dealerTrueTotal >= 17) {
      scoreTheRound();
    }
  };

  // HANDLE DEALING REST OF DEALERS HAND
  useEffect(() => {
    if (completeDealerHand === true && dealerTrueTotal < 17) {
      let timer1 = setTimeout(() => {
        handleAces(dealerHand, dealerTrueTotal, setDealerHand);
      }, 1000);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [completeDealerHand, dealerHand]);

  // SCORE THE ROUND
  useEffect(() => {
    if (completeDealerHand === true && dealerTrueTotal >= 17) {
      scoreTheRound();
    }
  }, [dealerTrueTotal]);

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
