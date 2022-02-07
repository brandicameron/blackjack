import './GameBoard.css';
import React, { useState, useEffect } from 'react';
import CardHand from './CardHand';
import Button from './Button';
import { useShuffleCards } from '../hooks/useShuffleCards';
import { useDealInitialHand } from '../hooks/useDealInitialHand';
import { useHandleAces } from '../hooks/useHandleAces';

export default function GameBoard({
  leftInShoe,
  setLeftInShoe,
  setWeHaveAWinner,
  setWinnerMessage,
  bankTotal,
  setBankTotal,
  betTotal,
  shuffledCards,
  setShuffledCards,
  setOfferDoubleDown,
  dealDoubleDown,
}) {
  // console.log(shuffledCards);

  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerFlip, setDealerFlip] = useState(false);
  const [dealerTotal, setDealerTotal] = useState(0);

  const { shuffleCards } = useShuffleCards();
  const { dealInitialHand } = useDealInitialHand();
  const { handleAces } = useHandleAces();

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
      dealInitialHand(shuffledCards, setDealerHand, setPlayerHand);
    }
  }, [shuffledCards]);

  useEffect(() => {
    setLeftInShoe(shuffledCards.length);
  }, [playerHand, dealerHand, shuffledCards]);

  // check if player hits 21 or busts with every hit
  useEffect(() => {
    if (playerHandTotal >= 21) {
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
    if (playerHand.length === 2) {
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
      handleAces(playerHand, playerHandTotal, setPlayerHand, shuffledCards);
      handleStay();
    }
  }, [dealDoubleDown]);

  // ************************************ HANDLE HIT & STAY ************************************

  const handleHitMe = () => {
    if (playerHandTotal <= 21) {
      handleAces(playerHand, playerHandTotal, setPlayerHand, shuffledCards);
    }
  };

  const handleStay = () => {
    setTimeout(() => {
      setDealerFlip(true);
    }, 250);
  };

  // Display dealer's true total & complete dealer hand once hole card is flipped
  useEffect(() => {
    dealerFlip
      ? setDealerTotal(dealerTrueTotal)
      : setDealerTotal(dealerHiddenTotal);

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
      let timer1 = setTimeout(() => {
        handleAces(dealerHand, dealerTrueTotal, setDealerHand, shuffledCards);
      }, 1000);
      return () => {
        clearTimeout(timer1);
      };
    } else if (dealerFlip === true) {
      scoreTheRound();
    }
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
      declareWinner('BLACKJACK!', handlePayout.blackJack);
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
      setBankTotal(bet);
      setWeHaveAWinner(true);
    }, 1500);
  };

  return (
    <section className='game-board'>
      <div className='game-btns'>
        <Button title='Hit Me' size='btn-lg' clickHandler={handleHitMe} />
        <Button title='Stay' size='btn-lg' clickHandler={handleStay} />
      </div>

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
    </section>
  );
}
