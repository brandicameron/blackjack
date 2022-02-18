import './SplitHand.css';
import { v4 as uuidv4 } from 'uuid';

export default function SplitHand({ splitHand, betChips }) {
  return (
    <div className='split-hand-container'>
      {splitHand.length > 0 &&
        splitHand.map((card, index) => (
          <div
            className='card-front split-card'
            key={uuidv4()}
            style={{
              left: `${index * (window.innerWidth > 600 ? 10 : 5)}px`,
              top: `${index * 5}px`,
            }}
          >
            <img
              src={require(`../images/card-icons${card.bgUrl}`)}
              alt=''
              className='card-bg-img'
            />
            <div className='card-info flex-center-column'>
              <p className='card-value bold' style={{ color: `${card.color}` }}>
                {card.displayValue}
              </p>
              <img
                src={require(`../images/card-icons${card.iconUrl}`)}
                alt={card.value}
                className='card-icon'
                width='248'
                height='346'
              />
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
