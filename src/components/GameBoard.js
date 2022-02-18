import './GameBoard.css';
import React, { useState, useEffect } from 'react';
import CardHand from './CardHand';
import Button from './Button';
import { useShuffleCards } from '../hooks/useShuffleCards';
import { useDealInitialHand } from '../hooks/useDealInitialHand';
import { useDealNextCard } from '../hooks/useDealNextCard';
import SplitHand from './SplitHand';

export default function GameBoard({
  leftInShoe,
  setLeftInShoe,
  setWeHaveAWinner,
  setWinnerMessage,
  bankTotal,
  setBankTotal,
  betTotal,
  setBetTotal,
  shuffledCards,
  setShuffledCards,
  setOfferDoubleDown,
  dealDoubleDown,
  betChips,
  setBetChips,
  splitHand,
  setSplitHand,
  scoreSplitHand,
}) {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerFlip, setDealerFlip] = useState(false);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [offerSplit, setOfferSplit] = useState(false);
  const [handleSplitAces, setHandleSplitAces] = useState(false);
  const [splitBetAmount, setSplitBetAmount] = useState([]);

  const { shuffleCards } = useShuffleCards();
  const { dealInitialHand } = useDealInitialHand();
  const { dealNextCard } = useDealNextCard();

  let playerHandTotal = playerHand.reduce((total, obj) => obj.value + total, 0);
  let dealerTrueTotal = dealerHand.reduce((total, obj) => obj.value + total, 0);
  let dealerHiddenTotal = dealerHand
    .slice(1)
    .reduce((total, obj) => obj.value + total, 0);

  // ************************************ SHUFFLE & INITIAL DEAL ************************************

  useEffect(() => {
    if (leftInShoe < 75) {
      setShuffledCards(shuffleCards);
    }
  }, []);

  useEffect(() => {
    if (shuffledCards.length > 0) {
      dealInitialHand(
        shuffledCards,
        setDealerHand,
        setPlayerHand,
        setOfferSplit,
        bankTotal,
        betTotal
      );
    }
  }, [shuffledCards]);

  useEffect(() => {
    setLeftInShoe(shuffledCards.length);
  }, [playerHand, dealerHand, shuffledCards]);

  // ************************************ HANDLE SPLIT ************************************

  const handleSplit = () => {
    if (playerHand[0].type === 'ace' && playerHand[1].type === 'ace') {
      playerHand[0].value = 11;
      playerHand[1].value = 11;
      setHandleSplitAces(true);
    }
    setOfferSplit(false);
    setSplitHand(playerHand.splice(1, 1));
    // setBankTotal((prev) => prev - betTotal);
    playerHandTotal = playerHand.reduce((total, obj) => obj.value + total, 0); //resets player total to deal with scoring aces
    setSplitBetAmount(betChips); //to reset the bet amount for second hand of split

    setTimeout(() => {
      dealNextCard(playerHand, playerHandTotal, setPlayerHand, shuffledCards);
    }, 500);
  };

  // deals single card to split aces hands and scores the round
  useEffect(() => {
    if (handleSplitAces === true && playerHand.length > 1) {
      let splitAceTimer = setTimeout(() => {
        handleStay();
      }, 1500);
      return () => {
        clearTimeout(splitAceTimer);
      };
    }
  }, [handleSplitAces, playerHand]);

  // moves original hand to gameboard after scoring the second hand
  useEffect(() => {
    if (scoreSplitHand === true) {
      let splitHandTimer = setTimeout(() => {
        setPlayerHand(splitHand);
        setSplitHand([]);
      }, 2000);

      return () => {
        clearTimeout(splitHandTimer);
      };
    }
  }, [scoreSplitHand]);

  // to score second hand of split
  useEffect(() => {
    if (scoreSplitHand === true) {
      setBetChips(splitBetAmount); //new
      setBetTotal(betChips.reduce((total, obj) => obj.value + total, 0));
      // setBankTotal((prev) => prev + betTotal); //new
      //deals rest of dealer hand if player busts on second hand of split & dealer only flipped
      if (
        splitHand.length === 0 &&
        dealerHand.length === 2 &&
        dealerTrueTotal < 17
      ) {
        console.log(betTotal);
        completeDealersHandandScoreRound();
      } else if (splitHand.length === 0) {
        scoreTheRound();
      }
    }
  }, [playerHandTotal, splitHand, betChips]);

  // ************************************ CHECK PLAYERS HAND WITH EVERY CARD DEALT ************************************

  // check if player hits 21 or busts with every hit
  // now considers split hands as well
  useEffect(() => {
    if (playerHandTotal >= 21 && splitHand.length === 1) {
      let timer0 = setTimeout(() => {
        handleStay();
      }, 1000);
      return () => {
        clearTimeout(timer0);
      };
    } else if (playerHandTotal >= 21) {
      let timer1 = setTimeout(() => {
        setDealerFlip(true);
      }, 250);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [playerHandTotal]);

  // ************************************ HANDLE DOUBLE DOWN ************************************

  useEffect(() => {
    // handles whether to offer double down button
    if (playerHand.length === 2 && splitHand.length === 0) {
      if (
        playerHandTotal > 8 &&
        playerHandTotal < 12 &&
        bankTotal >= betTotal * 2
      ) {
        setOfferDoubleDown(true);
      }
    } else if (playerHand.length > 2) {
      setOfferDoubleDown(false);
    }
  }, [playerHand]);

  useEffect(() => {
    // deals double down card & scores game
    if (dealDoubleDown === true) {
      dealNextCard(playerHand, playerHandTotal, setPlayerHand, shuffledCards);
      handleStay();
    }
  }, [dealDoubleDown]);

  // ************************************ HANDLE HIT & STAY ************************************

  const handleHitMe = () => {
    if (offerSplit === true) {
      setOfferSplit(false);
    }

    if (playerHandTotal <= 21) {
      dealNextCard(playerHand, playerHandTotal, setPlayerHand, shuffledCards);
    }
  };

  const handleStay = () => {
    if (offerSplit === true) {
      setOfferSplit(false);
    }

    if (splitHand.length === 1) {
      // moves the first completed split hand out of focus in order to play second hand
      let tempPlayerHand = [];
      tempPlayerHand.push(...playerHand);
      setPlayerHand(splitHand);
      setSplitHand(tempPlayerHand);
    } else if (splitHand.length > 1) {
      setDealerFlip(true);
    } else if (splitHand.length === 0) {
      //for regular hands
      setDealerFlip(true);
    }
  };

  // this corrects the bug where aces weren't scored correctly on the second split hand
  useEffect(() => {
    if (playerHand.length === 1 && splitHand.length > 0) {
      playerHandTotal = playerHand.reduce((total, obj) => obj.value + total, 0); //resets player total to deal with scoring aces
      let thisTimeout = setTimeout(() => {
        dealNextCard(playerHand, playerHandTotal, setPlayerHand, shuffledCards);
      }, 500);
      return () => {
        clearTimeout(thisTimeout);
      };
    }
  }, [playerHand]);

  // ************************************ HANDLE COMPLETING DEALERS HAND & SCORE THE ROUND ************************************

  const completeDealersHandandScoreRound = () => {
    if (
      playerHandTotal === 21 &&
      playerHand.length === 2 &&
      dealerFlip === true
    ) {
      scoreTheRound(); //natural blackjack
    } else if (
      dealerTrueTotal < 17 &&
      dealerFlip === true &&
      playerHandTotal <= 21
    ) {
      let timer = setTimeout(() => {
        dealNextCard(dealerHand, dealerTrueTotal, setDealerHand, shuffledCards);
      }, 1200);
      return () => {
        clearTimeout(timer);
      };
    } else if (dealerFlip === true) {
      scoreTheRound();
    }
  };

  useEffect(() => {
    dealerFlip
      ? setDealerTotal(dealerTrueTotal)
      : setDealerTotal(dealerHiddenTotal);

    completeDealersHandandScoreRound();
  }, [dealerHand, dealerFlip, dealerTrueTotal]);

  // ************************************ SCORE THE ROUND ************************************

  const handlePayout = {
    playerWins: (prev) => prev + betTotal,
    dealerWins: (prev) => prev - betTotal,
    push: (prev) => prev,
    blackJack: (prev) => prev + Math.ceil(betTotal * 1.5),
  };

  const scoreTheRound = () => {
    if (
      playerHandTotal === 21 &&
      playerHand.length === 2 &&
      dealerHand !== 21
    ) {
      if (handleSplitAces === true) {
        declareWinner('You win!', handlePayout.playerWins);
      } else {
        declareWinner('BLACKJACK!', handlePayout.blackJack);
      }
    } else if (dealerTrueTotal === playerHandTotal) {
      declareWinner('Push!', handlePayout.push);
    } else if (playerHandTotal === 21 && dealerTrueTotal !== 21) {
      declareWinner('You win!', handlePayout.playerWins);
    } else if (playerHandTotal > 21) {
      declareWinner('You busted, dealer wins.', handlePayout.dealerWins);
    } else if (dealerTrueTotal === 21) {
      declareWinner('Dealer wins.', handlePayout.dealerWins);
    } else if (dealerTrueTotal > 21) {
      declareWinner('Dealer busted, you win!', handlePayout.playerWins);
    } else if (dealerTrueTotal > playerHandTotal) {
      declareWinner('Dealer wins.', handlePayout.dealerWins);
    } else if (dealerTrueTotal < playerHandTotal) {
      declareWinner('You win!', handlePayout.playerWins);
    }
  };

  // ************************************ DECLARE WINNER ************************************
  const declareWinner = (winnerMessage, bet) => {
    setWinnerMessage(winnerMessage);

    setTimeout(() => {
      setWeHaveAWinner(true);
      setBetChips([]); //new
      setBankTotal(bet);
    }, 1500);
  };

  return (
    <section className='game-board'>
      {!handleSplitAces && (
        <div className='game-btns'>
          <Button title='Hit' size='btn-lg' clickHandler={handleHitMe} />
          <Button title='Stay' size='btn-lg' clickHandler={handleStay} />
          {offerSplit && (
            <Button
              title='Split'
              size='btn-lg split-btn'
              clickHandler={handleSplit}
            />
          )}
        </div>
      )}

      <div className='card-hands'>
        <CardHand
          playerOrDealerHand={dealerHand}
          playerOrDealer='Dealer'
          handTotal={dealerTotal}
          shuffledCards={shuffledCards}
          dealerFlip={dealerFlip}
        />
        <CardHand
          playerOrDealerHand={playerHand}
          playerOrDealer='Player'
          handTotal={playerHandTotal}
          shuffledCards={shuffledCards}
        />
      </div>
      {splitHand.length > 0 && (
        <SplitHand splitHand={splitHand} betChips={betChips} />
      )}
    </section>
  );
}
