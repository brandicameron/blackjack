import Cards from '../data/cardData.json';

export function useShuffleCards() {
  let cardsToShuffle = [];
  // play with a 6 deck shoe
  Array.from({ length: 6 }, () => cardsToShuffle.push(...Cards));

  // THANKS to:
  // https://stackoverflow.com/questions/48219487/javascript-how-to-clone-array-without-reference
  // for teaching me how to get a clean copy of an array
  cardsToShuffle = JSON.parse(JSON.stringify(cardsToShuffle));

  const shuffleCards = () => {
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = cardsToShuffle.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = cardsToShuffle[currentIndex];
      cardsToShuffle[currentIndex] = cardsToShuffle[randomIndex];
      cardsToShuffle[randomIndex] = temporaryValue;
    }
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    console.log(`Cards shuffled at ${time}`);

    // cardsToShuffle.forEach((card, index) => {
    //   card.id = index;
    // });

    return cardsToShuffle;
  };

  return { shuffleCards };
}
