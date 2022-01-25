import Button from './Button';
import './WinnerModal.css';

export default function WinnerModal({
  winnerName,
  setStartGame,
  setWeHaveAWinner,
  setBeginRound,
}) {
  const handlePlayAgain = () => {
    setStartGame(true);
    setBeginRound(false);
    setWeHaveAWinner(false);
  };

  return (
    <section className='winner-modal'>
      <h1 className='winner-message'>{winnerName}</h1>
      <Button title='Play Again' size='btn-lg' clickHandler={handlePlayAgain} />
    </section>
  );
}
