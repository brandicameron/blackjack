import './SplashPage.css';
import splashGraphic from '../images/splash-graphic.png';
import mobileSplashGraphic from '../images/splash-graphic-m.png';
import Button from '../components/Button';

export default function SplashPage({ setStartGame }) {
  const handleStartGame = () => setStartGame(true);

  return (
    <main className='splash-page flex-center-column'>
      <picture className='splash-page-graphic'>
        <source
          media='(max-width: 900px)'
          srcSet={mobileSplashGraphic}
          type='image/png'
        />
        <img
          src={splashGraphic}
          alt='Blackjack hand with scatted poker chips'
          className='splash-page-graphic'
        />
      </picture>
      <Button
        title='Play'
        size='btn-lg play-btn'
        clickHandler={handleStartGame}
      />
    </main>
  );
}
