import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';
import { useDealNextCard } from './useDealNextCard';
import { useScoreRound } from './useScoreRound';

export function useDealDealer() {
  const { scoreTheRound } = useScoreRound();
  const { dealNextCard } = useDealNextCard();

  const shuffledCards = useStoreState((state) => state.shuffledCards);
  const dealerHand = useStoreState((state) => state.dealerHand);
  const setDealerHand = useStoreActions((actions) => actions.setDealerHand);
  const dealerTotal = useStoreState((state) => state.dealerTotal);
  const playerHand = useStoreState((state) => state.playerHand);
  const playerTotal = useStoreState((state) => state.playerTotal);

  const dealDealer = () => {
    if (playerTotal === 21 && playerHand.length === 2) {
      scoreTheRound();
    } else if (dealerTotal < 17 && playerTotal <= 21) {
      let timer = setTimeout(() => {
        dealNextCard(shuffledCards, dealerHand, dealerTotal, setDealerHand);
      }, 1200);
      return () => {
        clearTimeout(timer);
      };
    } else {
      scoreTheRound();
    }
  };

  return { dealDealer };
}
