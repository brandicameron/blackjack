import './Bank.css';
import React, { useEffect, useState } from 'react';
import chipData from '../data/chipData.json';
import { v4 as uuidv4 } from 'uuid';

export default function Bank({ setBetChips, beginRound, bankTotal, betTotal }) {
  const [currentBankTotal, setCurrentBankTotal] = useState(0);
  const [chipsInBank, setChipsInBank] = useState([]);

  useEffect(() => {
    setCurrentBankTotal(bankTotal - betTotal);
  }, [bankTotal, betTotal]);

  //remove chip from bank if bank total is less than chip value
  useEffect(() => {
    const tempArray = [];
    chipData.map((chip) => {
      if (currentBankTotal >= chip.value) {
        tempArray.push(chip);
      }
    });
    setChipsInBank(tempArray);
  }, [currentBankTotal]);

  const handlePlaceBet = (e) => {
    setBetChips((prev) => [
      ...prev,
      {
        value: parseInt(e.target.dataset.value),
        url: `/chip-${e.target.dataset.value}.png`,
        id: e.target.dataset.id,
      },
    ]);
  };

  return (
    <aside className={beginRound ? 'bank lower-bank' : 'bank'}>
      <div className='bank-tab flex-center-column'>
        <h3 className='bank-total display-text'>
          Bank: <span className='bold'>${currentBankTotal}</span>
        </h3>
      </div>
      <div className='bank-chip-container'>
        {chipsInBank.map((chip) => (
          <button
            className='chip-btn'
            data-value={chip.value}
            key={chip.value}
            onClick={handlePlaceBet}
          >
            <img
              src={require(`../images${chip.url}`)}
              alt={`$${chip.value} Poker Chip`}
              width='120'
              height='120'
              data-value={chip.value}
              data-id={uuidv4()}
              className='chip'
            />
          </button>
        ))}
      </div>
    </aside>
  );
}
