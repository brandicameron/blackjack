import './CardHand.css';
import { useEffect } from 'react';
import cardBack from '../images/card-icons/card-back.png';

export function CardHand({
  playerOrDealer,
  playerOrDealerHand,
  playerOrDealerTotal,
  completeDealerHand,
  setPlayerOrDealerTotal,
}) {
  // ********** Set Hand Totals **********

  useEffect(() => {
    if (playerOrDealerHand.length > 0) {
      let tempTotal = playerOrDealerHand.reduce(
        (total, obj) => obj.value + total,
        0
      );

      if (completeDealerHand === false) {
        const hiddenValue = playerOrDealerHand[0].value;
        setPlayerOrDealerTotal(tempTotal - hiddenValue);
      } else {
        setPlayerOrDealerTotal(tempTotal);
      }
    }
  }, [playerOrDealerHand, completeDealerHand, setPlayerOrDealerTotal]);

  // for aria label that reads what the card is
  const findSuit = (card) => {
    let string = card.iconUrl;
    let suit = string.slice(1, -9);
    return suit;
  };

  const readableValue = (card) => {
    switch (card.displayValue) {
      case 'A':
        return 'Ace';
      case 'J':
        return 'Jack';
      case 'Q':
        return 'Queen';
      case 'K':
        return 'King';
      default:
        return card.displayValue;
    }
  };

  return (
    <section className='card-hand flex'>
      {playerOrDealerHand.map((card, index) => (
        <div
          className='card'
          key={`${card.value}-${playerOrDealer}-${index}`}
          style={{
            marginLeft: `${index * (window.innerWidth > 550 ? 7 : 3.5)}vh`,
            top: `${index * 10}px`,
            zIndex: `${index === 0 ? -100 : 0}`,
          }}
          aria-hidden={
            playerOrDealer === 'Dealer' && !completeDealerHand && index === 0
              ? 'true'
              : 'false'
          }
          aria-label={`${readableValue(card)} of ${findSuit(card)}s`}
        >
          <div
            className={
              playerOrDealer === 'Dealer' && completeDealerHand && index === 0
                ? 'flip-card flipped'
                : 'flip-card'
            }
          >
            {index === 0 && playerOrDealer === 'Dealer' && (
              <img src={cardBack} alt='' className='card-back' />
            )}
            <div
              className={
                index === 0 && playerOrDealer === 'Dealer'
                  ? 'card-face flex flip-card-front'
                  : 'card-face flex'
              }
            >
              <img
                src={require(`../images/card-icons${card.bgUrl}`)}
                alt=''
                width={170}
                height={246}
                className='suit-image'
              />
              <div className='card-value flex column'>
                <h4
                  className='value lg-text'
                  aria-hidden='true'
                  style={{
                    color: `${card.color}`,
                  }}
                >
                  {card.displayValue}
                </h4>
                <img
                  src={require(`../images/card-icons${card.iconUrl}`)}
                  alt=''
                  width={25}
                  height={25}
                  className='suit-icon'
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div
        className='score-container flex'
        aria-label={`${playerOrDealer} hand totals ${playerOrDealerTotal}`}
      >
        <h3 className='score med-text flex column' aria-hidden='true'>
          {playerOrDealer}
          <output className='bold lg-text'>{playerOrDealerTotal}</output>
        </h3>
      </div>
    </section>
  );
}
