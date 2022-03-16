import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';

export function useScoreRound() {
  const bankTotal = useStoreState((state) => state.bankTotal);
  const betTotal = useStoreState((state) => state.betTotal);
  const dealerHand = useStoreState((state) => state.dealerHand);
  const dealerTotal = useStoreState((state) => state.dealerTotal);
  const playerHand = useStoreState((state) => state.playerHand);
  const playerTotal = useStoreState((state) => state.playerTotal);
  const setBankTotal = useStoreActions((actions) => actions.setBankTotal);
  const removeBet = useStoreActions((actions) => actions.removeBet);
  const setEndRound = useStoreActions((actions) => actions.setEndRound);
  const setWinnerMessage = useStoreActions(
    (actions) => actions.setWinnerMessage
  );

  const scoreTheRound = () => {
    const handlePayout = {
      playerWins: bankTotal + betTotal,
      dealerWins: bankTotal - betTotal,
      push: bankTotal,
      blackJack: bankTotal + Math.ceil(betTotal * 1.5),
    };

    setTimeout(() => {
      if (playerTotal === 21 && playerHand.length === 2 && dealerHand !== 21) {
        setWinnerMessage('BLACKJACK');
        setBankTotal(handlePayout.blackJack);
      } else if (dealerTotal === playerTotal) {
        setWinnerMessage('Push');
        setBankTotal(handlePayout.push);
      } else if (playerTotal === 21 && dealerTotal !== 21) {
        setWinnerMessage('You win!');
        setBankTotal(handlePayout.playerWins);
      } else if (playerTotal > 21) {
        setWinnerMessage('You busted, dealer wins.');
        setBankTotal(handlePayout.dealerWins);
      } else if (dealerTotal === 21) {
        setWinnerMessage('Dealer wins.');
        setBankTotal(handlePayout.dealerWins);
      } else if (dealerTotal > 21) {
        setWinnerMessage('Dealer busted, you win!');
        setBankTotal(handlePayout.playerWins);
      } else if (dealerTotal > playerTotal) {
        setWinnerMessage('Dealer wins.');
        setBankTotal(handlePayout.dealerWins);
      } else if (dealerTotal < playerTotal) {
        setWinnerMessage('You win!');
        setBankTotal(handlePayout.playerWins);
      }
      removeBet([]);

      setEndRound(true);
    }, 1500);
  };

  return { scoreTheRound };
}
