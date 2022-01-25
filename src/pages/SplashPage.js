import './SplashPage.css';
import splashGraphic from '../images/splash-graphic.png';
import Button from '../components/Button';

export default function SplashPage({ setStartGame }) {
  const startGameClick = () => setStartGame(true);

  return (
    <main className='splash-page center-column'>
      <img
        className='splash-page-graphic'
        src={splashGraphic}
        alt='A blackjack hand and some poker chips.'
      />
      <Button
        title='Play'
        size='btn-lg play-btn'
        clickHandler={startGameClick}
      />
    </main>
  );
}
