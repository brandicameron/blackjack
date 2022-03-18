import { useHandleAces } from './useHandleAces';
import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';

export function useDealInitialHand() {
  const { handleDoubleAcesOnDeal } = useHandleAces();
  const betTotal = useStoreState((state) => state.betTotal);
  const bankTotal = useStoreState((state) => state.bankTotal);
  const setOfferSplitHand = useStoreActions((actions) => actions.setOfferSplitHand);

  const dealInitialHand = (cards, setDealer, setPlayer) => {
    let cardsForInitialDeal = undefined;
    cardsForInitialDeal = cards.splice(0, 4);

    let playerTempArray = [];
    for (let i = 0; i < 4; i += 2) {
      playerTempArray.push(cardsForInitialDeal[i]);
    }

    let dealerTempArray = [];
    for (let i = 1; i < 4; i += 2) {
      dealerTempArray.push(cardsForInitialDeal[i]);
    }

    if (playerTempArray[0].value === playerTempArray[1].value && bankTotal >= betTotal * 2) {
      setOfferSplitHand(true);
    } else if (
      playerTempArray[0].type === 'ace' &&
      playerTempArray[1].type === 'ace' &&
      bankTotal >= betTotal * 2
    ) {
      setOfferSplitHand(true);
    }

    handleDoubleAcesOnDeal(dealerTempArray, playerTempArray);
    setDealer(dealerTempArray);
    setPlayer(playerTempArray);
  };
  return { dealInitialHand };
}
