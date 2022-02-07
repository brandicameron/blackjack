export function useDealNextCard() {
  const dealNextCard = (hand, handTotal, setHand, shuffledCards) => {
    let findAce = hand.find((card) => card.value === 11);
    let nextCard = shuffledCards.splice(0, 1);

    if (handTotal + nextCard[0].value > 21 && findAce !== undefined) {
      //handle changing value of initally dealt ace if needed
      findAce.value = 1;
      setHand((prev) => [...prev, ...nextCard]);
    } else if (
      //handle changing value of currently dealt ace if needed
      nextCard[0].value === 11 &&
      handTotal + nextCard[0].value > 21
    ) {
      nextCard[0].value = 1;
      setHand((prev) => [...prev, ...nextCard]);
    } else {
      setHand((prev) => [...prev, ...nextCard]);
    }
  };
  return { dealNextCard };
}
