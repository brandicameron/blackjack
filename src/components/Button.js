import './Button.css';

export default function Button({ title, size, clickHandler }) {
  return (
    <button className={`btn ${size}`} onClick={clickHandler}>
      {title}
    </button>
  );
}
