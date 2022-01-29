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
  offerDoubleDown,
  setOfferDoubleDown,
  setDealDoubleDown,
  setOriginalBetAmount,
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

  // ************************************ HANDLE DOUBLE DOWN ************************************

  const handleDoubleDown = () => {
    setOriginalBetAmount(chipsBet);
    setChipsBet((prev) => [...prev, ...prev]); //should double the total bet
    setOfferDoubleDown(false);
    setDealDoubleDown(true);
  };

  return (
    <section className='placed-bet center-column'>
      {chipsBet.length === 0 && (
        <h1 className='instructions'>Select chips to place your bet...</h1>
      )}
      <div className='chips-bet-container'>
        {offerDoubleDown && (
          <Button
            title='2x Double Down'
            size='btn-round'
            clickHandler={handleDoubleDown}
          />
        )}
        {chipsBet.map((chip, index) => (
          <button
            className='chip-btn chip-bet'
            key={`${chip.value}-${index}`}
            style={{ left: `${index * 2}px`, bottom: `${index * 1}px` }}
          >
            <img
              src={require(`../images${chip.url}`)}
              alt='Poker chip'
              width='120'
              height='120'
              className='chip'
              data-id={chip.id}
              data-value={chip.value}
              onClick={beginRound ? undefined : handleChipRemove}
            />
          </button>
        ))}
      </div>
      <h1 className='display-text bet-text'>
        Bet: <span className='bold'>${betAmount}</span>
      </h1>
      {chipsBet.length !== 0 && !beginRound && (
        <div className='game-btns'>
          <div className='empty-element-for-flex-btn-positioning'></div>
          <Button title='Deal' size='btn-lg' clickHandler={handleBeginRound} />
        </div>
      )}
    </section>
  );
}
