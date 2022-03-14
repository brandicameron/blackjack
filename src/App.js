import './App.css';
import { useState, useEffect } from 'react';
import { SplashPage } from './components/SplashPage';
import { Header } from './components/Header';
import { Bank } from './components/Bank';
import { Bet } from './components/Bet';
import { CardHand } from './components/CardHand';
import { GameButton } from './components/GameButton';
import { Modal } from './components/Modal';

import { useShuffleCards } from './hooks/useShuffleCards';
import { useDealInitialHand } from './hooks/useDealInitialHand';
import { useDealNextCard } from './hooks/useDealNextCard';

export default function App() {
  const [splashPage, setSplashPage] = useState(true);
  const [bankTotal, setBankTotal] = useState(1000);
  const [beginRound, setBeginRound] = useState(false);
  const [bet, setBet] = useState([]);
  const [prevBet, setPrevBet] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [completeDealerHand, setCompleteDealerHand] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');
  const [endRound, setEndRound] = useState(false);

  let betTotal = bet.reduce((total, obj) => obj.value + total, 0);

  const { shuffleCards } = useShuffleCards();
  const { dealInitialHand } = useDealInitialHand();
  const { dealNextCard } = useDealNextCard();

  // ********** Deal Initial Hand **********

  if (shuffledCards.length < 75 && !beginRound) {
    setShuffledCards(shuffleCards);
  }

  const handleBeginRound = () => {
    setBeginRound(true);
    setPrevBet(bet);
    dealInitialHand(shuffledCards, setDealerHand, setPlayerHand);
  };

  // ********** Handle Hit **********

  const handleHit = () => {
    if (playerTotal <= 21 && completeDealerHand === false) {
      dealNextCard(shuffledCards, playerHand, playerTotal, setPlayerHand);
    }
  };

  // ********** Handle Stay & Deal Out Dealers Hand **********

  const handleStay = () => {
    setCompleteDealerHand(true);
  };

  // check if player hits 21 or busts with every hit
  useEffect(() => {
    if (playerTotal >= 21) {
      let timer0 = setTimeout(() => {
        handleStay();
      }, 1000);
      return () => {
        clearTimeout(timer0);
      };
    }
  }, [playerTotal]);

  useEffect(() => {
    if (completeDealerHand === true) {
      if (playerTotal === 21 && playerHand.length === 2) {
        scoreTheRound();
      } else if (dealerTotal < 17 && playerTotal <= 21) {
        let timer = setTimeout(() => {
          dealNextCard(shuffledCards, dealerHand, dealerTotal, setDealerHand);
        }, 1200);
        return () => {
          clearTimeout(timer);
        };
      } else {
        scoreTheRound();
      }
    }
  }, [dealerTotal, dealerHand]);

  const scoreTheRound = () => {
    const handlePayout = {
      playerWins: (prev) => prev + betTotal,
      dealerWins: (prev) => prev - betTotal,
      push: (prev) => prev,
      blackJack: (prev) => prev + Math.ceil(betTotal * 1.5),
    };
    setTimeout(() => {
      if (playerTotal === 21 && playerHand.length === 2 && dealerHand !== 21) {
        setWinnerMessage('BLACKJACK');
        setBankTotal(handlePayout.blackJack);
      } else if (dealerTotal === playerTotal) {
        setWinnerMessage('Push');
        setBankTotal(handlePayout.push);
      } else if (playerTotal === 21 && dealerTotal !== 21) {
        setWinnerMessage('You win!');
        setBankTotal(handlePayout.playerWins);
      } else if (playerTotal > 21) {
        setWinnerMessage('You busted, dealer wins.');
        setBankTotal(handlePayout.dealerWins);
      } else if (dealerTotal === 21) {
        setWinnerMessage('Dealer wins.');
        setBankTotal(handlePayout.dealerWins);
      } else if (dealerTotal > 21) {
        setWinnerMessage('Dealer busted, you win!');
        setBankTotal(handlePayout.playerWins);
      } else if (dealerTotal > playerTotal) {
        setWinnerMessage('Dealer wins.');
        setBankTotal(handlePayout.dealerWins);
      } else if (dealerTotal < playerTotal) {
        setWinnerMessage('You win!');
        setBankTotal(handlePayout.playerWins);
      }
      setBet([]);

      setEndRound(true);
    }, 1500);
  };

  const handlePlayAgain = () => {
    setEndRound(false);
    setBeginRound(false);
    setCompleteDealerHand(false);
    //this fixes failure to auto flip on natural blackjack after happening more than one time
    setPlayerTotal(0);
    setDealerTotal(0);
    setWinnerMessage('');

    let prevBetAmount = prevBet.reduce((total, obj) => obj.value + total, 0);

    setTimeout(() => {
      // if there's enough $$ in the bank, auto populate the players last bet amount
      if (prevBetAmount <= bankTotal) {
        setBet(prevBet);
      }
    }, 500);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setSplashPage(false);
    }, 1200);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <>
      {splashPage && <SplashPage />}
      <Header shuffledCards={shuffledCards} />
      <Bank
        betTotal={betTotal}
        setBet={setBet}
        beginRound={beginRound}
        bankTotal={bankTotal}
      />
      <main>
        <section className='game-board flex column'>
          {beginRound && (
            <CardHand
              playerOrDealer='Dealer'
              playerOrDealerHand={dealerHand}
              playerOrDealerTotal={dealerTotal}
              completeDealerHand={completeDealerHand}
              setPlayerOrDealerTotal={setDealerTotal}
            />
          )}
          <Bet
            bet={bet}
            beginRound={beginRound}
            setBet={setBet}
            betTotal={betTotal}
          />
          {beginRound && (
            <CardHand
              playerOrDealer='Player'
              playerOrDealerHand={playerHand}
              playerOrDealerTotal={playerTotal}
              setPlayerOrDealerTotal={setPlayerTotal}
            />
          )}
          {!beginRound && bet.length > 0 && (
            <div className='game-buttons flex flex-end'>
              <GameButton title='DEAL' clickHandler={handleBeginRound} />
            </div>
          )}
          {beginRound && (
            <div className='game-buttons flex'>
              <GameButton title='HIT' clickHandler={handleHit} />
              <GameButton title='STAY' clickHandler={handleStay} />
            </div>
          )}
        </section>
      </main>

      {endRound && (
        <Modal
          winnerMessage={winnerMessage}
          handlePlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
}
