import './Header.css';
import { useStoreState } from 'easy-peasy';
import cardsIcon from '../images/cards-icon.svg';
import questionGraphic from '../images/question.svg';

export function Header() {
  const cardsLeft = useStoreState((state) => state.cardsLeft);

  return (
    <header className='header flex'>
      <a
        className='header-item flex column'
        href='https://www.onlinegambling.com/blackjack/rules/'
        target='_blank'
        rel='noreferrer'
      >
        <img src={questionGraphic} alt='' className='header-icon' width={25} height={25} />
        How to Play
      </a>
      <div className='header-item flex column'>
        <img src={cardsIcon} alt='' className='header-icon' width={25} height={25} />
        <div>
          <span className='bold'>{cardsLeft}</span> Left in Deck
        </div>
      </div>
    </header>
  );
}
