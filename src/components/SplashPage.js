import './SplashPage.css';
import SplashGraphic from '../images/splash-graphic.png';
import SplashGraphicMobile from '../images/splash-graphic-m.png';

export function SplashPage() {
  return (
    <div className='splash-page flex'>
      <div className='title'></div>
      <picture className='splash-graphic'>
        <source
          media='(max-width: 550px)'
          srcSet={SplashGraphicMobile}
          type='image/png'
        />
        <img
          src={SplashGraphic}
          alt='Blackjack hand with scattered poker chips.'
          className='splash-graphic'
          width='648'
          height='376'
        />
      </picture>
    </div>
  );
}
