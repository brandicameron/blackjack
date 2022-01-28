import { useState, useEffect } from 'react';
import './Bank.css';
import Button from './Button';
import chipData from '../data/chipData.json';
import { v4 as uuidv4 } from 'uuid';

export default function Bank({
  beginRound,
  setChipsBet,
  bankTotal,
  betAmount,
  setBetAmount,
}) {
  const [currentBankTotal, setCurrentBankTotal] = useState(0);
  const [chipstoDisplay, setChipstoDisplay] = useState([]);
  const [allIn, setAllIn] = useState(false);

  useEffect(() => {
    setCurrentBankTotal(bankTotal - betAmount);
  }, [bankTotal, betAmount]);

  //remove chips from bank if bank total is less than chip amount
  useEffect(() => {
    const tempArray = [];
    chipData.map((chip) => {
      if (currentBankTotal >= chip.value) {
        tempArray.push(chip);
      }
    });
    setChipstoDisplay(tempArray);
  }, [currentBankTotal]);

  const handleChipAdd = (e) => {
    setChipsBet((prev) => [
      ...prev,
      {
        value: parseInt(e.target.dataset.value),
        url: `/chip-${e.target.dataset.value}.svg`,
        id: e.target.dataset.id,
      },
    ]);
  };

  //handle All In feature
  const handleAllInBtn = () => {
    let tempArray = [];

    if (allIn === false) {
      chipData.map((chip) => {
        tempArray.push({
          value: chip.value,
          url: chip.url,
        });
      });
      setChipsBet(tempArray);
      setAllIn(true);
    } else if (allIn === true) {
      tempArray = [];
      setChipsBet(tempArray);
      setAllIn(false);
    }
  };

  useEffect(() => {
    if (allIn === true) {
      setBetAmount(bankTotal);
    } else if (allIn === false) {
      setBetAmount(0);
    }
  }, [allIn]);

  return (
    <aside className={beginRound ? 'bank lower-bank' : 'bank'}>
      <div className='tab center-column'>
        <h2 className='bank-total display-text'>
          Bank: <span className='bold'>${currentBankTotal}</span>
          {/* Bank: <span className='bold'>${bankTotal - betAmount}</span> */}
        </h2>
        <Button title='All in' size='btn-sm' clickHandler={handleAllInBtn} />
      </div>
      <div className='chip-container'>
        {chipstoDisplay.map((chip) => (
          <button
            className='chip-btn'
            data-value={chip.value}
            key={uuidv4()}
            onClick={handleChipAdd}
          >
            <img
              src={require(`../images${chip.url}`)}
              alt={`${chip.value} dollar chip.`}
              className='chip'
              width='120'
              height='120'
              data-value={chip.value}
              data-id={uuidv4()}
            />
          </button>
        ))}
      </div>
    </aside>
  );
}
