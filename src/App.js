import './App.css';
import { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';
import { SplashPage } from './components/SplashPage';
import { Header } from './components/Header';
import { Bank } from './components/Bank';
import { GameBoard } from './components/GameBoard';
import { Modal } from './components/Modal';

import { useShuffleCards } from './hooks/useShuffleCards';

export default function App() {
  const [splashPage, setSplashPage] = useState(true);
  const shuffledCards = useStoreState((state) => state.shuffledCards);
  const setShuffledCards = useStoreActions((actions) => actions.setShuffledCards);
  const beginRound = useStoreState((state) => state.beginRound);
  const endRound = useStoreState((state) => state.endRound);

  const { shuffleCards } = useShuffleCards();

  if (shuffledCards.length < 75 && !beginRound) {
    let cardsShuffled = shuffleCards();
    setShuffledCards(cardsShuffled);
  }

  // Handle Splash Page
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
      <Header />
      <Bank />
      <GameBoard />
      {endRound && <Modal />}
    </>
  );
}
