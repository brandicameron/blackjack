import './GameButton.css';

export function GameButton({ title, clickHandler, autoFocus, addedClass }) {
  return (
    <button
      className={`game-btn btn-lg flex bold ${addedClass}`}
      onClick={clickHandler}
      autoFocus={autoFocus}
    >
      {title}
    </button>
  );
}
