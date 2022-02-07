import './CardHand.css';

export default function CardHand({
  playerOrDealerHand,
  playerOrDealer,
  handTotal,
  shuffledCards,
  dealerFlip,
}) {
  let mobile = '/club-K-m.png';
  return (
    <section className='card-hand'>
      {shuffledCards.length > 0 &&
        playerOrDealerHand.map((card, index) => (
          <div
            className={
              index === 0 && dealerFlip === false ? 'card' : 'card flipped'
            }
            key={`${card.url}-${playerOrDealer}-${index}`}
            style={{
              left: `${index * (window.innerWidth > 600 ? 30 : 20)}px`,
              top: `${index * 5}px`,
            }}
          >
            {playerOrDealer === 'Dealer' && index === 0 && (
              <div className='card-back'></div>
            )}
            <div className='card-front'>
              <picture className='playing-card'>
                <source
                  media='(max-width: 900px)'
                  srcSet={require(`../images/cards${card.mobileUrl}`)}
                  type='image/png'
                />
                <img
                  src={require(`../images/cards${card.url}`)}
                  alt={card.value}
                  className='playing-card'
                  width='288'
                  height='403'
                />
              </picture>
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
