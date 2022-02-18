export function useDealInitialHand() {
  const dealInitialHand = (
    cards,
    setDealer,
    setPlayer,
    setOfferSplit,
    bankTotal,
    betTotal
  ) => {
    let cardsForInitialDeal = undefined;
    cardsForInitialDeal = cards.splice(0, 4);

    let playerTempArray = [];
    for (let i = 0; i < 4; i += 2) {
      playerTempArray.push(cardsForInitialDeal[i]);
    }

    let dealerTempArray = [];
    for (let i = 1; i < 4; i += 2) {
      dealerTempArray.push(cardsForInitialDeal[i]);
    }

    const handleDoubleAcesOnDeal = () => {
      if (dealerTempArray[0].value === 11 && dealerTempArray[1].value === 11) {
        dealerTempArray[0].value = 1;
      }

      if (playerTempArray[0].value === 11 && playerTempArray[1].value === 11) {
        playerTempArray[0].value = 1;
      }
    };

    const handleOfferSplitHand = () => {
      if (
        playerTempArray[0].value === playerTempArray[1].value &&
        bankTotal >= betTotal * 2
      ) {
        setOfferSplit(true);
      } else if (
        playerTempArray[0].type === 'ace' &&
        playerTempArray[1].type === 'ace' &&
        bankTotal >= betTotal * 2
      ) {
        setOfferSplit(true);
      }
    };

    // dealerTempArray = [
    //   {
    //     value: 7,
    //     displayValue: 7,
    //     bgUrl: '/spade.svg',
    //     iconUrl: '/spade.svg',
    //     color: '#000000',
    //   },
    //   {
    //     value: 10,
    //     displayValue: 'Q',
    //     bgUrl: '/queen.png',
    //     iconUrl: '/heart.svg',
    //     color: '#b70707',
    //   },
    // ];

    // playerTempArray = [
    //   {
    //     value: 10,
    //     displayValue: 'K',
    //     bgUrl: '/king.png',
    //     iconUrl: '/spade.svg',
    //     color: '#000000',
    //   },
    //   {
    //     value: 8,
    //     displayValue: 8,
    //     bgUrl: '/spade.svg',
    //     iconUrl: '/spade.svg',
    //     color: '#000000',
    //   },
    // ];

    handleDoubleAcesOnDeal();
    handleOfferSplitHand();
    setDealer(dealerTempArray);
    setPlayer(playerTempArray);
  };
  return { dealInitialHand };
}
