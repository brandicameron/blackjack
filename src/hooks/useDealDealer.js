import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';
import { useDealNextCard } from './useDealNextCard';
import { useScoreRound } from './useScoreRound';
import useSound from 'use-sound';
import CardSound from '../sounds/card.mp3';

export function useDealDealer() {
  const { scoreTheRound } = useScoreRound();
  const { dealNextCard } = useDealNextCard();

  const soundMuted = useStoreState((state) => state.soundMuted);
  const dealerHand = useStoreState((state) => state.dealerHand);
  const setDealerHand = useStoreActions((actions) => actions.setDealerHand);
  const dealerTotal = useStoreState((state) => state.dealerTotal);
  const playerHand = useStoreState((state) => state.playerHand);
  const playerTotal = useStoreState((state) => state.playerTotal);

  const [playCardSound] = useSound(CardSound, {
    playbackRate: 1.5,
    volume: 0.5,
    interrupt: true,
    soundEnabled: soundMuted ? false : true,
  });

  const dealDealer = () => {
    if (playerTotal === 21 && playerHand.length === 2) {
      scoreTheRound();
    } else if (dealerTotal < 17 && playerTotal <= 21) {
      let timer = setTimeout(() => {
        dealNextCard(dealerHand, dealerTotal, setDealerHand);
        setTimeout(() => {
          playCardSound();
        }, 50);
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
