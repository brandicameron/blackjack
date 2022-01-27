import React, { useEffect } from 'react';
import './Bet.css';
import Button from '../components/Button';

export default function Bet({
  chipsBet,
  setChipsBet,
  beginRound,
  betAmount,
  setBetAmount,
  setBeginRound,
  shuffleCards,
  cardsLeftToDeal,
}) {
  const handleBeginRound = () => {
    setBeginRound(true);
    if (cardsLeftToDeal < 75) {
      shuffleCards();
    }
  };

  useEffect(() => {
    setBetAmount(chipsBet.reduce((total, obj) => obj.value + total, 0));
  }, [chipsBet]);

  const handleChipRemove = (e) => {
    const target = e.target.dataset.id;
    setChipsBet(chipsBet.filter((item) => target !== item.id));
  };

  return (
    <section className='placed-bet center-column'>
      {chipsBet.length === 0 && (
        <h1 className='instructions'>Select chips to place your bet...</h1>
      )}
      <div className='chips-bet'>
        {chipsBet.map((chip, index) => (
          <img
            key={`${chip.value}-${index}`}
            data-id={chip.id}
            src={require(`../images${chip.url}`)}
            alt='Poker chip'
            className='chip-bet'
            width='120'
            height='120'
            data-value={chip.value}
            style={{ left: `${index * 2}px`, bottom: `${index * 1}px` }}
            //prevents player from changing bet once game is in play
            onClick={beginRound ? undefined : handleChipRemove}
          />
        ))}
      </div>
      <h1 className='display-text bet-text'>
        Bet: <span className='bold'>${betAmount}</span>
      </h1>
      {chipsBet.length !== 0 && !beginRound && (
        <Button
          title='Deal'
          size='btn-lg deal-btn'
          clickHandler={handleBeginRound}
        />
      )}
    </section>
  );
}
