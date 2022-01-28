import './App.css';
import SplashPage from './pages/SplashPage';
import React, { useState } from 'react';
import Header from './components/Header';
import GamePage from './pages/GamePage';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [beginRound, setBeginRound] = useState(false);
  const [cardsLeftToDeal, setCardsLeftToDeal] = useState(0);

  return (
    <>
      <Header
        beginRound={beginRound}
        cardsLeftToDeal={cardsLeftToDeal}
        startGame={startGame}
      />
      {!startGame && <SplashPage setStartGame={setStartGame} />}
      {startGame && (
        <GamePage
          beginRound={beginRound}
          setBeginRound={setBeginRound}
          cardsLeftToDeal={cardsLeftToDeal}
          setCardsLeftToDeal={setCardsLeftToDeal}
          setStartGame={setStartGame} //going to WinnerModal component...
        />
      )}
    </>
  );
}

export default App;
