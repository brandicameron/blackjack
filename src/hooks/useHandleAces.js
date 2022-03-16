import { useStoreActions } from 'easy-peasy';

export function useHandleAces() {
  const setAcesChanged = useStoreActions((actions) => actions.setAcesChanged);

  const handleDoubleAcesOnDeal = (dealerTempArray, playerTempArray) => {
    if (dealerTempArray[0].value === 11 && dealerTempArray[1].value === 11) {
      dealerTempArray[0].value = 1;
    }

    if (playerTempArray[0].value === 11 && playerTempArray[1].value === 11) {
      playerTempArray[0].value = 1;
    }
  };

  const handleAceValue = (nextCard, hand, handTotal, setHand) => {
    let findAce = hand.find((card) => card.value === 11);

    if (handTotal + nextCard[0].value > 21 && findAce !== undefined) {
      //handle changing value of previously dealt ace if needed
      findAce.value = 1;
      setHand([...hand, ...nextCard]);
      setAcesChanged(nextCard);
      // setHand((prev) => [...prev, ...nextCard]);
    } else if (
      //handle changing value of currently dealt ace if needed
      nextCard[0].value === 11 &&
      handTotal + nextCard[0].value > 21
    ) {
      nextCard[0].value = 1;
      // setHand((prev) => [...prev, ...nextCard]);
      setHand([...hand, ...nextCard]);
      setAcesChanged(nextCard);
    } else {
      // setHand((prev) => [...prev, ...nextCard]);
      setHand([...hand, ...nextCard]);
    }
  };

  return { handleDoubleAcesOnDeal, handleAceValue };
}
