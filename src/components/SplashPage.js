import './SplashPage.css';
import SplashGraphic from '../images/splash-graphic.png';

export function SplashPage() {
  return (
    <div className='splash-page flex'>
      <div className='title'></div>
      <img
        src={SplashGraphic}
        alt='Blackjack hand with scattered poker chips.'
        className='splash-graphic'
      />
    </div>
  );
}
