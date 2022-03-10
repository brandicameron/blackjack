import './GameButton.css';

export function GameButton({ title, clickHandler, autoFocus }) {
  return (
    <button
      className='game-btn btn-lg flex bold'
      onClick={clickHandler}
      autoFocus={autoFocus}
    >
      {title}
    </button>
  );
}
