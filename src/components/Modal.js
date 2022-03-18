import './Modal.css';
import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';
import { GameButton } from './GameButton';

export function Modal() {
  const setBeginRound = useStoreActions((actions) => actions.setBeginRound);
  const bankTotal = useStoreState((state) => state.bankTotal);
  const prevBet = useStoreState((state) => state.prevBet);
  const setBet = useStoreActions((actions) => actions.setBet);
  const setPlayerHand = useStoreActions((actions) => actions.setPlayerHand);
  const setEndRound = useStoreActions((actions) => actions.setEndRound);
  const setCompleteDealerHand = useStoreActions((actions) => actions.setCompleteDealerHand);
  const winnerMessage = useStoreState((state) => state.winnerMessage);
  const setOfferDoubleDown = useStoreActions((actions) => actions.setOfferDoubleDown);
  const setDoubleDown = useStoreActions((actions) => actions.setDoubleDown);
  // const setOfferSplitHand = useStoreActions((actions) => actions.setOfferSplitHand);

  const handlePlayAgain = () => {
    setEndRound(false);
    setBeginRound(false);
    setCompleteDealerHand(false);
    //fixes failure to auto flip on natural blackjack after happening more than one time
    setPlayerHand([]);
    setOfferDoubleDown(true);
    setDoubleDown(false);
    // setOfferSplitHand(false); //do you really need this after adding it to hit & stay?

    let prevBetAmount = prevBet.reduce((total, obj) => obj.value + total, 0);

    setTimeout(() => {
      // if there's enough $$ in the bank, auto populate the players last bet amount
      if (prevBetAmount <= bankTotal) {
        setBet(...prevBet);
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
