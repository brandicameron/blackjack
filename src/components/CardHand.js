import './CardHand.css';
import cardBackground from '../images/card-icons/card-bg.svg';
import cardBackSide from '../images/card-icons/card-back.png';

export default function CardHand({
  playerOrDealerHand,
  playerOrDealer,
  handTotal,
  shuffledCards,
  dealerFlip,
}) {
  return (
    <section className='card-hand'>
      {shuffledCards.length > 0 &&
        playerOrDealerHand.map((card, index) => (
          <div
            className={
              index === 0 && dealerFlip === false ? 'card flipped' : 'card'
            }
            key={`${card.value}-${playerOrDealer}-${index}`}
            style={{
              left: `${index * (window.innerWidth > 900 ? 40 : 20)}px`,
              top: `${index * (window.innerWidth > 900 ? 15 : 10)}px`,
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
              {playerOrDealer === 'Dealer' && index === 0 && (
                <img
                  src={cardBackSide}
                  alt=''
                  className={
                    dealerFlip === false ? 'card-back' : 'card-back rotate'
                  }
                  width='170'
                  height='242'
                />
              )}
            </div>
          </div>
        ))}
      <h2 className='hand-total flex-center-column' aria-label='Card total:'>
        <span className='bold lg-text'>{handTotal}</span>
        {playerOrDealer}
      </h2>
    </section>
  );
}
