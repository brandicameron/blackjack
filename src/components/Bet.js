import './Bet.css';
import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';
import { GameButton } from './GameButton';

export function Bet() {
  const beginRound = useStoreState((state) => state.beginRound);
  const bet = useStoreState((state) => state.bet);
  const betTotal = useStoreState((state) => state.betTotal);
  const setDoubleDown = useStoreActions((actions) => actions.setDoubleDown);
  const offerDoubleDown = useStoreState((state) => state.offerDoubleDown);
  const setOfferDoubleDown = useStoreActions((actions) => actions.setOfferDoubleDown);
  const doubleBet = useStoreActions((actions) => actions.doubleBet);
  const addBetClass = useStoreActions((actions) => actions.addBetClass);
  const removeBet = useStoreActions((actions) => actions.removeBet);

  const handleRemoveBet = (e) => {
    if (beginRound === false) {
      const target = e.target.dataset.id;
      const item = bet.find((chip) => target === chip.id);
      addBetClass((item.classes = 'chip-button remove-chip'));
      setTimeout(() => {
        removeBet(bet.filter((item) => target !== item.id));
      }, 200);
    }
  };

  const handleDoubleDown = () => {
    doubleBet([...bet, ...bet]);
    setDoubleDown(true);
    setOfferDoubleDown(false);
  };

  return (
    <section className='bet-container flex column'>
      {bet.length === 0 && !beginRound && (
        <h2 className='instructions lg-text bold'>Select chips to place your bet...</h2>
      )}
      <div className='bet-chips flex'>
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
              }px) translateX(${chip.ww / 2 - (chip.ww - chip.x) + chip.w / 2}px)`,
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
        {beginRound && offerDoubleDown && (
          <GameButton title='2x' clickHandler={handleDoubleDown} addedClass={'round'} />
        )}
      </div>
      {bet.length > 0 && (
        <h2 className='med-text' aria-label={`Total bet: $${betTotal}`}>
          ${betTotal}
        </h2>
      )}
    </section>
  );
}
