import './Bet.css';
import React, { useEffect } from 'react';
import Button from '../components/Button';

export default function Bet({
  betChips,
  setBetChips,
  beginRound,
  setBeginRound,
  betTotal,
  setBetTotal,
  bankTotal,
  offerDoubleDown,
  setOfferDoubleDown,
  setDealDoubleDown,
  setOriginalBetAmount,
}) {
  useEffect(() => {
    //if current bet amount is higher than bank total, remove the bet
    if (betTotal > bankTotal) {
      setBetChips([]);
    }
  }, [bankTotal]);

  useEffect(() => {
    setBetTotal(betChips.reduce((total, obj) => obj.value + total, 0));
  }, [betChips]);

  const handleRemoveChip = (e) => {
    if (beginRound === false) {
      const target = e.target.dataset.id;
      setBetChips(betChips.filter((item) => target !== item.id));
    }
  };

  const handleDealButton = () => {
    setBeginRound(true);
  };

  // ************************************ HANDLE DOUBLE DOWN ************************************

  const handleDoubleDown = () => {
    setOriginalBetAmount(betChips);
    setBetChips((prev) => [...prev, ...prev]); //should double the total bet
    setOfferDoubleDown(false);
    setDealDoubleDown(true);
  };

  return (
    <section className='placed-bet flex-center-column'>
      {betChips.length === 0 && (
        <h1 className='instructions'>Select chips to place your bet...</h1>
      )}
      <div className='bet-area'>
        {offerDoubleDown && (
          <Button
            title='2x Double Down'
            size='btn-round'
            clickHandler={handleDoubleDown}
          />
        )}
        {betChips.map((chip, index) => (
          <button
            className='chip-btn chip-bet'
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
              onClick={handleRemoveChip}
            />
          </button>
        ))}
      </div>
      <h2 className='display-text bet-text'>
        Bet: <span className='bold'>${betTotal}</span>
      </h2>

      {betChips.length !== 0 && !beginRound && (
        <div className='game-btns'>
          <div className='empty-element-for-flex-btn-positioning'></div>
          <Button title='Deal' size='btn-lg' clickHandler={handleDealButton} />
        </div>
      )}
    </section>
  );
}
