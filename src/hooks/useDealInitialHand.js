import { useHandleAces } from './useHandleAces';

export function useDealInitialHand() {
  const { handleDoubleAcesOnDeal } = useHandleAces();

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

    handleDoubleAcesOnDeal(dealerTempArray, playerTempArray);
    setDealer(dealerTempArray);
    setPlayer(playerTempArray);
  };
  return { dealInitialHand };
}
