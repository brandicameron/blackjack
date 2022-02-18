import './WinnerModal.css';
import React, { useEffect } from 'react';
import Button from './Button';

export default function WinnerModal({
  setStartGame,
  setBeginRound,
  setWeHaveAWinner,
  winnerMessage,
  setDealDoubleDown,
  splitHand,
  scoreSplitHand,
  setScoreSplitHand,
}) {
  //removes play again button & take you back to the game board on Split hand
  useEffect(() => {
    if (splitHand.length > 1) {
      setScoreSplitHand(true);
      let timer = setTimeout(() => {
        setWeHaveAWinner(false);
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
    } else if (splitHand.length === 0) {
      setScoreSplitHand(false);
    }
  }, []);

  const handlePlayAgain = () => {
    setStartGame(true);
    setBeginRound(false);
    setWeHaveAWinner(false);
    setDealDoubleDown(false);
  };

  return (
    <section className='winner-modal'>
      <h1 className='winner-message'>{winnerMessage}</h1>
      {!scoreSplitHand && (
        <Button
          title='Play Again'
          size='btn-lg play-again'
          clickHandler={handlePlayAgain}
        />
      )}
    </section>
  );
}
