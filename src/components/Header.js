import './Header.css';
import cardsIcon from '../images/cards-icon.svg';
import questionGraphic from '../images/question.svg';

export default function Header({ leftInShoe, startGame }) {
  return (
    <header className='header flex-center'>
      <a
        href='https://www.onlinegambling.com/blackjack/rules/'
        target='_blank'
        rel='noreferrer'
        className='center-column how-link'
      >
        <img src={questionGraphic} alt='' className='icon' />
        How to Play
      </a>
      {startGame && (
        <div>
          <img src={cardsIcon} alt='' className='icon' />
          <p className='cards-left'>
            <span className='bold'>{leftInShoe}</span> left in deck
          </p>
        </div>
      )}
    </header>
  );
}
