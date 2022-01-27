import { useEffect } from 'react';
// import Button from './Button';
import './WinnerModal.css';

export default function WinnerModal({
  winnerName,
  setStartGame,
  setWeHaveAWinner,
  setBeginRound,
}) {
  // MAYBE ADD BUTTON BACK INSTEAD?

  // const handlePlayAgain = () => {
  //   setStartGame(true);
  //   setBeginRound(false);
  //   setWeHaveAWinner(false);
  // };

  useEffect(() => {
    let timer1 = setTimeout(() => {
      setStartGame(true);
      setBeginRound(false);
      setWeHaveAWinner(false);
    }, 2500);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <section className='winner-modal'>
      <h1 className='winner-message'>{winnerName}</h1>
      {/* <Button title='Play Again' size='btn-lg' clickHandler={handlePlayAgain} /> */}
    </section>
  );
}
