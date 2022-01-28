import './Header.css';
import cardsIcon from '../images/cards-icon.svg';
import questionGraphic from '../images/question.svg';

export default function Header({ beginRound, cardsLeftToDeal, startGame }) {
  return (
    <header className='header center'>
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
        <div className='cards-left center-column'>
          <img src={cardsIcon} alt='' className='icon' />
          <div className='cards-left'>
            <span className='bold'>{cardsLeftToDeal}</span> left in deck
          </div>
        </div>
      )}
    </header>
  );
}
