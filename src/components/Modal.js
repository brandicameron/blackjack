import './Modal.css';
import { useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';
import { GameButton } from './GameButton';

export function Modal() {
  const setBeginRound = useStoreActions((actions) => actions.setBeginRound);
  const bankTotal = useStoreState((state) => state.bankTotal);
  const prevBet = useStoreState((state) => state.prevBet);
  const repopulatePrevBet = useStoreActions((actions) => actions.repopulatePrevBet);
  const setPlayerHand = useStoreActions((actions) => actions.setPlayerHand);
  const setEndRound = useStoreActions((actions) => actions.setEndRound);
  const setCompleteDealerHand = useStoreActions((actions) => actions.setCompleteDealerHand);
  const winnerMessage = useStoreState((state) => state.winnerMessage);
  const setOfferDoubleDown = useStoreActions((actions) => actions.setOfferDoubleDown);

  const handlePlayAgain = () => {
    setEndRound(false);
    setBeginRound(false);
    setCompleteDealerHand(false);
    //fixes failure to auto flip on natural blackjack after happening more than one time
    setPlayerHand([]);
    setOfferDoubleDown(true);

    let prevBetAmount = prevBet.reduce((total, obj) => obj.value + total, 0);

    setTimeout(() => {
      // if there's enough $$ in the bank, auto populate the players last bet amount
      if (prevBetAmount <= bankTotal) {
        repopulatePrevBet([...prevBet]);
      }
    }, 500);
  };

  return (
    <section className='modal flex column'>
      <div className='modal-message xlg-text bold'>{winnerMessage}</div>
      <GameButton title='Play Again' clickHandler={handlePlayAgain} autoFocus='autoFocus' />
    </section>
  );
}
