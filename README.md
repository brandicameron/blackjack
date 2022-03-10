# Blackjack!

This is my first official React project, and as usual I seemed to have jumped straight into the deep end. Lots of improvements need to be made here, but hey, that's the fun part.

- The game plays with a 6 card shoe and reshuffles after the deck falls below 75 cards. (doesn't shuffle mid round, waits for the next round to shuffle)

- Dealer must stand on 17

- Blackjack pays 3 to 2

PLAY HERE: [https://brandicameron.github.io/blackjack/](https://brandicameron.github.io/blackjack/)

## Screenshot

![App Screenshot](/public/screen-shot.png)

---

## To Do:

- Add option to double down.
- Add option to play split hands.
- Some kind of stats page when game over. (bank runs out)
- Animation showing when cards are being shuffled.
- Create an input where player can change the number of decks being used.
- Add state to local storage.
- Sound effects? Maybe not.
- Change currency symbol for different regions?

---

## Things Learned:

- React hooks, components, ect. (the usual stuff when first learning react)
- It was particularly challenging to figure out the scoring of Aces, especially changing the value of a previously dealt ace if a subsequent card pushed the total over 21.
- Another super fun challenge was capturing the poker chip locations so that they could be animated to the bet area and back to the correct location in the bank if removed.
- I enjoyed figuring out how to add aria labels programmatically. (read the value & suit of each card, doesn't read the dealers hole card unless it's been flipped)
- Adding a react project to Github

---

## Credits & Attributions

---

Graphics were customized in Illustrator and Photoshop using vector graphics from the following:

King Graphic: [https://thenounproject.com/icon/king-139372/](https://thenounproject.com/icon/king-139372/)

Queen Graphic: [https://thenounproject.com/icon/queen-139386/](https://thenounproject.com/icon/queen-139386/)

Jack Graphic: [https://thenounproject.com/icon/priest-139381/](https://thenounproject.com/icon/priest-139381/)

Card Back Design: [macrovector on freepik.com](https://www.freepik.com/free-vector/decorative-card-suits-set_2875060.htm#query=macrovector%20playing%20card&position=12&from_view=search)

Poker Chips: [Vecteezy](https://www.vecteezy.com/free-vector/poker-chip)

Question mark Icon: [Aneeque Ahmed on thenounproject.com](https://thenounproject.com/icon/question-1157126/)

Cards Icon: [Aneeque Ahmed on thenounproject.com](https://thenounproject.com/icon/gambling-1401157/)

---

## Author

---

Brandi Cameron

[hello@brandicameron.com](mailto:hello@brandicameron.com)

[www.brandicameron.com](https://brandicameron.com/)
