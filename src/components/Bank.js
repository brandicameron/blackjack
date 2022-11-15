import './Bank.css';
import { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';
import { v4 as uuidv4 } from 'uuid';
import useSound from 'use-sound';
import ChipSound from '../sounds/chip.mp3';
import chipData from '../data/chipData.json';

export function Bank() {
  const [chipsInBank, setChipsInBank] = useState([]);
  const soundMuted = useStoreState((state) => state.soundMuted);
  const currentBankTotal = useStoreState((state) => state.currentBankTotal);
  const bet = useStoreState((state) => state.bet);
  const setBet = useStoreActions((actions) => actions.setBet);
  const beginRound = useStoreState((state) => state.beginRound);

  const [playChipSound] = useSound(ChipSound, {
    volume: 0.03,
    interrupt: true,
    soundEnabled: soundMuted ? false : true,
  });

  //remove chip from bank if bank total is less than chip value
  useEffect(() => {
    const tempArray = [];
    chipData.forEach((chip) => {
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

    if (bet.length >= 1) {
      setTimeout(() => {
        playChipSound();
      }, 175);
    }
  };

  return (
    <aside
      className={beginRound ? 'bank lower-bank' : 'bank'}
      aria-hidden={beginRound ? 'true' : 'false'}
    >
      <div className='bank-tab flex' aria-label={`Bank Total: ${currentBankTotal} dollars.`}>
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
