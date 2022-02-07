import './WinnerModal.css';
import Button from './Button';

export default function WinnerModal({
  setStartGame,
  setBeginRound,
  setWeHaveAWinner,
  winnerMessage,
  dealDoubleDown,
  setDealDoubleDown,
  originalBetAmount,
  setBetChips,
  bankTotal,
}) {
  const handlePlayAgain = () => {
    setStartGame(true);
    setBeginRound(false);
    setWeHaveAWinner(false);

    // reverts original bet amount after a double down situation
    if (
      dealDoubleDown === true &&
      originalBetAmount.reduce((total, obj) => obj.value + total, 0) < bankTotal
    ) {
      setBetChips(originalBetAmount);
    } else if (
      dealDoubleDown === true &&
      originalBetAmount.reduce((total, obj) => obj.value + total, 0) > bankTotal
    ) {
      setBetChips([]);
    }
    // if (dealDoubleDown === true) {
    //   setBetChips(originalBetAmount);
    // }
    setDealDoubleDown(false);
  };

  return (
    <section className='winner-modal'>
      <h1 className='winner-message'>{winnerMessage}</h1>
      <Button
        title='Play Again'
        size='btn-lg play-again'
        clickHandler={handlePlayAgain}
      />
    </section>
  );
}
