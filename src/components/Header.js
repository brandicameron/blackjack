import './Header.css';
import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';
import cardsIcon from '../images/cards-icon.svg';
import volumeIcon from '../images/volume.svg';
import volumeMutedIcon from '../images/volume-muted.svg';

export function Header() {
  const cardsLeft = useStoreState((state) => state.cardsLeft);
  const soundMuted = useStoreState((state) => state.soundMuted);
  const setSoundMuted = useStoreActions((actions) => actions.setSoundMuted);

  const handleToggleSound = () => {
    if (soundMuted) {
      setSoundMuted(false);
    } else {
      setSoundMuted(true);
    }
  };

  return (
    <header className='header flex'>
      <button
        onClick={handleToggleSound}
        aria-live='polite'
        aria-label={soundMuted ? 'Volume Muted' : 'Volume On'}
      >
        <img src={soundMuted ? volumeMutedIcon : volumeIcon} alt='' width={45} height={45} />
      </button>

      <div className='flex column'>
        <img src={cardsIcon} alt='' width={25} height={25} />
        <div>
          <span className='bold'>{cardsLeft}</span> in Deck
        </div>
      </div>
    </header>
  );
}
