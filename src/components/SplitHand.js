import './SplitHand.css';
import { v4 as uuidv4 } from 'uuid';
import cardBackground from '../images/card-icons/card-bg.svg';

export default function SplitHand({ splitHand, betChips }) {
  return (
    <div className='split-hand-container split-card'>
      {splitHand.length > 0 &&
        splitHand.map((card, index) => (
          <div
            className='card'
            key={uuidv4()}
            style={{
              left: `${index * (window.innerWidth > 600 ? 10 : 5)}px`,
              top: `${index * 5}px`,
              zIndex: `${index === 0 ? -100 : 0}`,
            }}
          >
            <img
              src={cardBackground}
              alt=''
              className='card-bg'
              width='170'
              height='242'
            />
            <div
              className='card-front'
              style={{
                backgroundImage: `url(
                  ${require(`../images/card-icons${card.bgUrl}`)}`,
              }}
            >
              <div className='card-info flex-center-column'>
                <p
                  className='card-value bold'
                  style={{ color: `${card.color}` }}
                >
                  {card.displayValue}
                </p>
                <img
                  src={require(`../images/card-icons${card.iconUrl}`)}
                  alt={card.value}
                  className='card-sm-icon'
                  width='25'
                  height='30'
                />
              </div>
            </div>
          </div>
        ))}
      <div className='split-chips-container'>
        {betChips.map((chip, index) => (
          <button
            className='chip-btn split-chips'
            key={`${chip.value}-${index}`}
            style={{ left: `${index * 2}px`, bottom: `${index * 1}px` }}
          >
            <img
              src={require(`../images${chip.url}`)}
              alt={`$${chip.value} Poker Chip`}
              width='120'
              height='120'
              className='chip'
              data-id={chip.id}
              data-value={chip.value}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
