import './CardHand.css';

export default function CardHand({
  shuffledCards,
  playerOrDealer,
  player,
  handTotal,
  dealerFlip,
}) {
  return (
    <section className='card-hand'>
      {shuffledCards.length > 0 &&
        playerOrDealer.map((card, index) => (
          <div
            className={
              index === 0 && dealerFlip === false
                ? 'card hidden-card'
                : 'card flipped'
            }
            key={`${card.url}-${player}-${index}`}
            style={{ left: `${index * 30}px`, top: `${index * 5}px` }}
          >
            <div className='card-back'></div>
            <div className='card-front'>
              <img
                src={require(`../images/cards${card.url}`)}
                alt={card.value}
                className='playing-card'
                width='150'
                height='209'
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
