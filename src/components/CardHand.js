import './CardHand.css';

export default function CardHand({
  playerOrDealerHand,
  playerOrDealer,
  handTotal,
  shuffledCards,
  dealerFlip,
}) {
  return (
    <section className='card-hand flex-center-column'>
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
            <div className='card-front'>
              <img
                src={require(`../images/card-icons${card.bgUrl}`)}
                alt=''
                className='card-bg-img'
              />
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
                  className='card-icon'
                  width='248'
                  height='346'
                />
              </div>
              {playerOrDealer === 'Dealer' && index === 0 && (
                <div
                  className={
                    dealerFlip === false ? 'card-back' : 'card-back rotate'
                  }
                ></div>
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
