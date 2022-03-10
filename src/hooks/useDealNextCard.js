import { useHandleAces } from './useHandleAces';

export function useDealNextCard() {
  const { handleAceValue } = useHandleAces();

  const dealNextCard = (shuffledCards, hand, handTotal, setHand) => {
    let nextCard = shuffledCards.splice(0, 1);
    handleAceValue(nextCard, hand, handTotal, setHand);
  };

  return { dealNextCard };
}
