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
  prevBetAmount,
  setPrevBetAmount,
  bankTotal,
  offerDoubleDown,
  setOfferDoubleDown,
  setDealDoubleDown,
  setOriginalBetAmount,
  setActiveSplitHand,
}) {
  // adds previous bet amount automatically if a round has already been played
  useEffect(() => {
    if (
      beginRound === false &&
      prevBetAmount.length > 0 &&
      bankTotal >= prevBetAmount
    ) {
      let prevBetTimer = setTimeout(() => {
        setBetChips(prevBetAmount);
      }, 500);
      return () => {
        clearTimeout(prevBetTimer);
      };
    }
  }, [beginRound]);

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
      const item = betChips.find((chip) => target === chip.id);

      setBetChips(
        (prev) => ((item.classes = 'chip-btn chip-bet remove-chip'), [...prev])
      );

      setTimeout(() => {
        setBetChips(betChips.filter((item) => target !== item.id));
      }, 200);
    }
  };

  const handleDealButton = () => {
    setActiveSplitHand(false); //restores ability to grant a blackjack payout
    setBeginRound(true);
    setPrevBetAmount(betChips);
  };

  // ************************************ HANDLE DOUBLE DOWN ************************************

  const handleDoubleDown = () => {
    setOriginalBetAmount(betChips);
    setBetChips((prev) => [...prev, ...prev]); //double the total bet
    setOfferDoubleDown(false);
    setDealDoubleDown(true);
  };

  return (
    <section className='placed-bet flex-center-column'>
      {betChips.length === 0 && prevBetAmount < 1 && (
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
            className={chip.classes}
            key={`${chip.value}-${index}`}
            style={{
              left: `${index * 3}px`,
              bottom: `${index * 1}px`,
              transform: `translateY(${
                chip.wh / 2 - (chip.wh - chip.y) + chip.h / 2 + 29
              }px) translateX(${
                chip.ww / 2 - (chip.ww - chip.x) + chip.w / 2 + 3
              }px)`,
            }}
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
