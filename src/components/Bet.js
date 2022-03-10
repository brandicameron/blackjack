import './Bet.css';

export function Bet({ betTotal, bet, beginRound, setBet }) {
  const handleRemoveBet = (e) => {
    if (beginRound === false) {
      const target = e.target.dataset.id;
      const item = bet.find((chip) => target === chip.id);

      setBet((prev) => ((item.classes = 'chip-button remove-chip'), [...prev]));

      setTimeout(() => {
        setBet(bet.filter((item) => target !== item.id));
      }, 200);
    }
  };

  return (
    <section className='bet-container flex column'>
      {bet.length === 0 && !beginRound && (
        <h2 className='instructions lg-text bold'>
          Select chips to place your bet...
        </h2>
      )}
      <div className='bet-chips'>
        {bet.map((chip, index) => (
          <button
            className={chip.classes}
            aria-label={`Poker chip worth $${chip.value}`}
            key={`${chip.value}-${index}`}
            style={{
              left: `${index * 3}px`,
              bottom: `${index * 1}px`,
              transform: `translateY(${
                chip.wh / 2 - (chip.wh - chip.y) + chip.h / 2
              }px) translateX(${
                chip.ww / 2 - (chip.ww - chip.x) + chip.w / 2
              }px)`,
            }}
            onClick={handleRemoveBet}
          >
            <img
              src={require(`../images${chip.url}`)}
              alt=''
              width={100}
              height={100}
              data-id={chip.id}
              className='chip-image'
            />
          </button>
        ))}
      </div>
      {bet.length > 0 && (
        <h2 className='med-text' aria-label={`Total bet: $${betTotal}`}>
          ${betTotal}
        </h2>
      )}
    </section>
  );
}
