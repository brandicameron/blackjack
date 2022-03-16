import { useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';
import { useDealInitialHand } from '../hooks/useDealInitialHand';
import { useDealNextCard } from '../hooks/useDealNextCard';
import { useDealDealer } from '../hooks/useDealDealer';
import { Bet } from './Bet';
import { CardHand } from './CardHand';
import { GameButton } from './GameButton';

export function GameBoard() {
  const shuffledCards = useStoreState((state) => state.shuffledCards);
  const beginRound = useStoreState((state) => state.beginRound);
  const setBeginRound = useStoreActions((actions) => actions.setBeginRound);
  const bet = useStoreState((state) => state.bet);
  const setPrevBet = useStoreActions((actions) => actions.setPrevBet);
  const dealerHand = useStoreState((state) => state.dealerHand);
  const setDealerHand = useStoreActions((actions) => actions.setDealerHand);
  const playerHand = useStoreState((state) => state.playerHand);
  const setPlayerHand = useStoreActions((actions) => actions.setPlayerHand);
  const dealerTotal = useStoreState((state) => state.dealerTotal);
  const playerTotal = useStoreState((state) => state.playerTotal);
  const completeDealerHand = useStoreState((state) => state.completeDealerHand);
  const setCompleteDealerHand = useStoreActions((actions) => actions.setCompleteDealerHand);
  const acesChanged = useStoreState((state) => state.acesChanged);
  const { dealInitialHand } = useDealInitialHand();
  const { dealNextCard } = useDealNextCard();
  const { dealDealer } = useDealDealer();

  const handleBeginRound = () => {
    setBeginRound(true);
    setPrevBet(bet);
    dealInitialHand(shuffledCards, setDealerHand, setPlayerHand);
  };

  // ********** Check if player hits 21 or busts with every hit **********

  useEffect(() => {
    if (playerTotal >= 21) {
      let timer0 = setTimeout(() => {
        setCompleteDealerHand(true);
      }, 1000);
      return () => {
        clearTimeout(timer0);
      };
    }
  }, [playerTotal]);

  const handleHit = () => {
    if (playerTotal < 21 && completeDealerHand === false) {
      dealNextCard(shuffledCards, playerHand, playerTotal, setPlayerHand);
    }
  };

  const handleStay = () => {
    setCompleteDealerHand(true);
  };

  useEffect(() => {
    if (completeDealerHand === true) {
      dealDealer();
    }
  }, [dealerTotal, acesChanged, completeDealerHand]);

  return (
    <main>
      <section className='game-board flex column'>
        {beginRound && (
          <CardHand
            playerOrDealer='Dealer'
            playerOrDealerHand={dealerHand}
            playerOrDealerTotal={dealerTotal}
            completeDealerHand={completeDealerHand}
          />
        )}
        <Bet beginRound={beginRound} />
        {beginRound && (
          <CardHand
            playerOrDealer='Player'
            playerOrDealerHand={playerHand}
            playerOrDealerTotal={playerTotal}
          />
        )}
        {!beginRound && bet.length > 0 && (
          <div className='game-buttons flex flex-end'>
            <GameButton title='DEAL' clickHandler={handleBeginRound} />
          </div>
        )}
        {beginRound && (
          <div className='game-buttons flex'>
            <GameButton title='HIT' clickHandler={handleHit} />
            <GameButton title='STAY' clickHandler={handleStay} />
          </div>
        )}
      </section>
    </main>
  );
}
