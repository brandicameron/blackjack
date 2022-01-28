import { useState, useEffect } from 'react';
import { useShuffleCards } from '../hooks/useShuffleCards';
import Cards from '../data/cardData.json';
import Bank from '../components/Bank';
import Bet from '../components/Bet';
import './GamePage.css';
import GameBoard from '../components/GameBoard';
import WinnerModal from '../components/WinnerModal';

export default function GamePage({
  beginRound,
  setBeginRound,
  cardsLeftToDeal,
  setCardsLeftToDeal,
  setStartGame,
}) {
  const [bankTotal, setBankTotal] = useState(1000);
  const [chipsBet, setChipsBet] = useState([]);
  const [betAmount, setBetAmount] = useState(0);
  const [shuffledCards, setShuffledCards] = useState([]);
  const { shuffle } = useShuffleCards();
  const [numDecksInPlay, setNumDecksInPlay] = useState(6);
  const [numCardsPlayed, setNumCardsPlayed] = useState(0);
  const [weHaveAWinner, setWeHaveAWinner] = useState(false); //controls modal
  const [winnerName, setWinnerName] = useState('');

  //gets called in bet.js with Deal button
  const shuffleCards = () => {
    let allCards = [];
    //determine how many decks to play with
    setNumCardsPlayed(0);
    Array.from({ length: numDecksInPlay }, () => allCards.push(...Cards));
    setShuffledCards(shuffle(allCards));
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    console.log(`Cards shuffled at ${time}`);
  };

  useEffect(() => {
    setCardsLeftToDeal(shuffledCards.length - numCardsPlayed);
  }, [numCardsPlayed]);

  return (
    <main className='game-page '>
      <Bet
        setChipsBet={setChipsBet}
        beginRound={beginRound}
        setBeginRound={setBeginRound}
        betAmount={betAmount}
        chipsBet={chipsBet}
        setBetAmount={setBetAmount}
        shuffleCards={shuffleCards}
        cardsLeftToDeal={cardsLeftToDeal}
      />
      {beginRound && (
        <GameBoard
          shuffledCards={shuffledCards}
          numCardsPlayed={numCardsPlayed}
          setNumCardsPlayed={setNumCardsPlayed}
          betAmount={betAmount}
          setBankTotal={setBankTotal}
          setWinnerName={setWinnerName}
          weHaveAWinner={weHaveAWinner}
          setWeHaveAWinner={setWeHaveAWinner}
        />
      )}
      <Bank
        setChipsBet={setChipsBet}
        beginRound={beginRound}
        bankTotal={bankTotal}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
      />
      {weHaveAWinner && (
        <WinnerModal
          winnerName={winnerName}
          setStartGame={setStartGame}
          setWeHaveAWinner={setWeHaveAWinner}
          setBeginRound={setBeginRound}
        />
      )}
    </main>
  );
}
