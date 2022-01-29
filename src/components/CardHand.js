import './CardHand.css';

export default function CardHand({
  shuffledCards,
  playerOrDealer,
  player,
  handTotal,
  dealerFlip,
}) {
  let horizontalDistance = '--horizontalCardDistance';
  return (
    <section className='card-hand'>
      {shuffledCards.length > 0 &&
        playerOrDealer.map((card, index) => (
          <div
            className={
              index === 0 && dealerFlip === false ? 'card' : 'card flipped'
            }
            key={`${card.url}-${player}-${index}`}
            style={{
              left: `${index * (window.innerWidth > 600 ? 30 : 20)}px`,
              top: `${index * 5}px`,
            }}
          >
            <div className='card-back'></div>
            <div className='card-front'>
              <img
                src={require(`../images/cards${card.url}`)}
                alt={card.value}
                className='playing-card'
                width='288'
                height='403'
              />
            </div>
          </div>
        ))}
      <h2 className='hand-total center-column' aria-label='Card total:'>
        <span className='bold lg-text'>{handTotal}</span>
        {player}
      </h2>
    </section>
  );
}
