import './App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import SplashPage from './pages/SplashPage';
import Bank from './components/Bank';
import Bet from './components/Bet';
import GameBoard from './components/GameBoard';
import WinnerModal from './components/WinnerModal';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [beginRound, setBeginRound] = useState(false);
  const [leftInShoe, setLeftInShoe] = useState(0);
  const [betChips, setBetChips] = useState([]);
  const [betTotal, setBetTotal] = useState(0);
  const [prevBetAmount, setPrevBetAmount] = useState([]);
  const [bankTotal, setBankTotal] = useState(1000);
  const [weHaveAWinner, setWeHaveAWinner] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');
  const [shuffledCards, setShuffledCards] = useState([]);
  //for double down
  const [offerDoubleDown, setOfferDoubleDown] = useState(false);
  const [dealDoubleDown, setDealDoubleDown] = useState(false);
  const [originalBetAmount, setOriginalBetAmount] = useState([]);
  //for splitting a hand
  const [splitHand, setSplitHand] = useState([]);
  const [scoreSplitHand, setScoreSplitHand] = useState(false);

  return (
    <main>
      <Header startGame={startGame} leftInShoe={leftInShoe} />
      {!startGame && <SplashPage setStartGame={setStartGame} />}
      {startGame && (
        <Bank
          setBetChips={setBetChips}
          beginRound={beginRound}
          bankTotal={bankTotal}
          betTotal={betTotal}
        />
      )}
      {startGame && (
        <Bet
          betChips={betChips}
          setBetChips={setBetChips}
          betTotal={betTotal}
          setBetTotal={setBetTotal}
          prevBetAmount={prevBetAmount}
          setPrevBetAmount={setPrevBetAmount}
          beginRound={beginRound}
          setBeginRound={setBeginRound}
          bankTotal={bankTotal}
          offerDoubleDown={offerDoubleDown}
          setOfferDoubleDown={setOfferDoubleDown}
          setDealDoubleDown={setDealDoubleDown}
          setOriginalBetAmount={setOriginalBetAmount}
        />
      )}
      {beginRound && (
        <GameBoard
          leftInShoe={leftInShoe}
          setLeftInShoe={setLeftInShoe}
          setWeHaveAWinner={setWeHaveAWinner}
          setWinnerMessage={setWinnerMessage}
          bankTotal={bankTotal}
          setBankTotal={setBankTotal}
          betTotal={betTotal}
          setBetTotal={setBetTotal}
          shuffledCards={shuffledCards}
          setShuffledCards={setShuffledCards}
          setOfferDoubleDown={setOfferDoubleDown}
          dealDoubleDown={dealDoubleDown}
          betChips={betChips}
          setBetChips={setBetChips}
          splitHand={splitHand}
          setSplitHand={setSplitHand}
          scoreSplitHand={scoreSplitHand}
        />
      )}
      {weHaveAWinner && (
        <WinnerModal
          setStartGame={setStartGame}
          setWeHaveAWinner={setWeHaveAWinner}
          setBeginRound={setBeginRound}
          winnerMessage={winnerMessage}
          setDealDoubleDown={setDealDoubleDown}
          splitHand={splitHand}
          scoreSplitHand={scoreSplitHand}
          setScoreSplitHand={setScoreSplitHand}
        />
      )}
    </main>
  );
}

export default App;
