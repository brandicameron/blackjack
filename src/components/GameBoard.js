import { useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { useStoreActions } from 'easy-peasy';
import { useDealInitialHand } from '../hooks/useDealInitialHand';
import { useDealNextCard } from '../hooks/useDealNextCard';
import { useDealDealer } from '../hooks/useDealDealer';
import { useKeyPress } from '../hooks/useKeyPress';
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
  const doubleDown = useStoreState((state) => state.doubleDown);
  const setOfferDoubleDown = useStoreActions((actions) => actions.setOfferDoubleDown);
  const offerSplitHand = useStoreState((state) => state.offerSplitHand);
  const setOfferSplitHand = useStoreActions((actions) => actions.setOfferSplitHand);
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
      setOfferDoubleDown(false);
      let timer0 = setTimeout(() => {
        setCompleteDealerHand(true);
      }, 1000);
      return () => {
        clearTimeout(timer0);
      };
    }
  }, [playerTotal]);

  const handleHit = () => {
    setOfferDoubleDown(false);
    setOfferSplitHand(false);
    if (playerTotal < 21 && completeDealerHand === false) {
      dealNextCard(shuffledCards, playerHand, playerTotal, setPlayerHand);
    }
  };

  const handleStay = () => {
    setOfferDoubleDown(false);
    setOfferSplitHand(false);
    setCompleteDealerHand(true);
  };

  // ********** Handle Game Key Presses **********

  const arrowLeftPressed = useKeyPress('ArrowLeft');
  const arrowRightPressed = useKeyPress('ArrowRight');

  useEffect(() => {
    if (arrowLeftPressed) {
      handleHit();
    }
  }, [arrowLeftPressed]);

  useEffect(() => {
    if (arrowRightPressed) {
      handleStay();
    }
  }, [arrowRightPressed]);

  useEffect(() => {
    if (completeDealerHand === true) {
      dealDealer();
    }
  }, [dealerTotal, acesChanged, completeDealerHand]);

  useEffect(() => {
    if (doubleDown === true) {
      let timer1 = setTimeout(() => {
        dealNextCard(shuffledCards, playerHand, playerTotal, setPlayerHand);
      }, 500);

      let timer2 = setTimeout(() => {
        handleStay();
      }, 1500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [doubleDown]);

  const handleSplitHand = () => {
    console.log('Split the hand!');
  };

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
        <Bet />
        {beginRound && (
          <CardHand
            playerOrDealer='Player'
            playerOrDealerHand={playerHand}
            playerOrDealerTotal={playerTotal}
          />
        )}
        {!beginRound && bet.length > 0 && (
          <div className='game-buttons flex flex-end'>
            <GameButton title='DEAL' clickHandler={handleBeginRound} autoFocus='autoFocus' />
          </div>
        )}
        {beginRound && (
          <div className='game-buttons flex'>
            <GameButton title='HIT' clickHandler={handleHit} />
            <div>
              {offerSplitHand && (
                <GameButton title='SPLIT' clickHandler={handleSplitHand} addedClass={'split-btn'} />
              )}
              <GameButton title='STAY' clickHandler={handleStay} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
