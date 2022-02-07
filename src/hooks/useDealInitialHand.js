export function useDealInitialHand() {
  const dealInitialHand = (cards, setDealer, setPlayer) => {
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

    handleDoubleAcesOnDeal();
    setDealer(dealerTempArray);
    setPlayer(playerTempArray);

    // setPlayer([
    //   {
    //     value: 10,
    //     url: '/heart-Q.png',
    //   },
    //   {
    //     value: 11,
    //     url: '/diamond-A.svg',
    //     type: 'ace',
    //   },
    // ]);
  };
  return { dealInitialHand };
}
