import { useHandleAces } from './useHandleAces';
import { useStoreState } from 'easy-peasy';

export function useDealNextCard() {
  const { handleAceValue } = useHandleAces();
  const shuffledCards = useStoreState((state) => state.shuffledCards);

  const dealNextCard = (hand, handTotal, setHand) => {
    let nextCard = shuffledCards.splice(0, 1);
    handleAceValue(nextCard, hand, handTotal, setHand);
  };

  return { dealNextCard };
}
