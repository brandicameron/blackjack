import './Bank.css';
import { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';
import { v4 as uuidv4 } from 'uuid';
import chipData from '../data/chipData.json';

export function Bank() {
  const [currentBankTotal, setCurrentBankTotal] = useState(0);
  const [chipsInBank, setChipsInBank] = useState([]);
  const bankTotal = useStoreState((state) => state.bankTotal);
  const setBet = useStoreActions((actions) => actions.setBet);
  const betTotal = useStoreState((state) => state.betTotal);
  const beginRound = useStoreState((state) => state.beginRound);

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

  const handleBet = (e) => {
    let location = e.target.getBoundingClientRect();
    let width = window.innerWidth;
    let height = window.innerHeight;

    setBet({
      value: parseInt(e.target.dataset.value),
      url: `/chip-${e.target.dataset.value}.png`,
      id: e.target.dataset.id,
      x: location.x,
      y: location.y,
      ww: width,
      wh: height,
      w: location.width,
      h: location.height,
      classes: 'chip-button',
    });
  };

  useEffect(() => {
    setCurrentBankTotal(bankTotal - betTotal);
  }, [bankTotal, betTotal]);

  return (
    <aside
      className={beginRound ? 'bank lower-bank' : 'bank'}
      aria-hidden={beginRound ? 'true' : 'false'}
    >
      <div
        className='bank-tab flex'
        role='heading'
        aria-level='1'
        aria-label={`Bank Total: ${currentBankTotal} dollars.`}
      >
        <h1 aria-hidden='true' className='bank-total med-text'>
          Bank: <span className='bold'>${currentBankTotal}</span>
        </h1>
      </div>
      <div className='bank-chip-container'>
        {chipsInBank.map((chip) => (
          <button
            className='chip-bank-button'
            data-value={chip.value}
            key={uuidv4()}
            onClick={handleBet}
            aria-label={`$${chip.value} Poker Chip`}
            tabIndex={beginRound ? '-1' : '0'}
          >
            <img
              src={require(`../images${chip.url}`)}
              alt=''
              width='120'
              height='120'
              data-value={chip.value}
              data-id={uuidv4()}
              className='chip-image'
            />
          </button>
        ))}
      </div>
    </aside>
  );
}
