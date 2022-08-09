import { useHandleAces } from './useHandleAces';
import { useStoreState } from 'easy-peasy';

export function useDealInitialHand() {
  const { handleDoubleAcesOnDeal } = useHandleAces();
  const shuffledCards = useStoreState((state) => state.shuffledCards);

  const dealInitialHand = (setDealer, setPlayer) => {
    let cardsForInitialDeal = undefined;
    cardsForInitialDeal = shuffledCards.splice(0, 4);

    let playerTempArray = [];
    for (let i = 0; i < 4; i += 2) {
      playerTempArray.push(cardsForInitialDeal[i]);
    }

    let dealerTempArray = [];
    for (let i = 1; i < 4; i += 2) {
      dealerTempArray.push(cardsForInitialDeal[i]);
    }

    handleDoubleAcesOnDeal(dealerTempArray, playerTempArray);
    setDealer(dealerTempArray);
    setPlayer(playerTempArray);
  };
  return { dealInitialHand };
}
