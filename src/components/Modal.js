import './Modal.css';
import { GameButton } from './GameButton';

export function Modal({ winnerMessage, handlePlayAgain }) {
  return (
    <section className='modal flex column'>
      <div className='modal-message xlg-text bold'>{winnerMessage}</div>
      <GameButton
        title='Play Again'
        clickHandler={handlePlayAgain}
        autoFocus='autoFocus'
      />
    </section>
  );
}
