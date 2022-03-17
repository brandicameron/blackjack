import { createStore, action, computed } from 'easy-peasy';

export const store = createStore({
  shuffledCards: [],
  setShuffledCards: action((state, payload) => {
    state.shuffledCards = payload;
  }),
  cardsLeft: computed((state) => state.shuffledCards.length),
  beginRound: false,
  setBeginRound: action((state, payload) => {
    state.beginRound = payload;
  }),
  dealerHand: [],
  setDealerHand: action((state, payload) => {
    state.dealerHand = payload;
  }),
  playerHand: [],
  setPlayerHand: action((state, payload) => {
    state.playerHand = payload;
  }),
  dealerTotal: computed((state) => state.dealerHand.reduce((total, obj) => obj.value + total, 0)),
  playerTotal: computed((state) => state.playerHand.reduce((total, obj) => obj.value + total, 0)),
  completeDealerHand: false,
  setCompleteDealerHand: action((state, payload) => {
    state.completeDealerHand = payload;
  }),
  bet: [],
  setBet: action((state, payload) => {
    state.bet.push(payload);
  }),
  doubleBet: action((state, payload) => {
    state.bet = payload;
  }),
  addBetClass: action((state, payload) => {
    state.bet = [...state.bet];
  }),
  removeBet: action((state, payload) => {
    state.bet = payload;
  }),
  prevBet: [],
  setPrevBet: action((state, payload) => {
    state.prevBet = payload;
  }),
  bankTotal: 1000,
  setBankTotal: action((state, payload) => {
    state.bankTotal = payload;
  }),
  betTotal: computed((state) => state.bet.reduce((total, obj) => obj.value + total, 0)),
  winnerMessage: 0,
  setWinnerMessage: action((state, payload) => {
    state.winnerMessage = payload;
  }),
  endRound: false,
  setEndRound: action((state, payload) => {
    state.endRound = payload;
  }),
  acesChanged: [],
  setAcesChanged: action((state, payload) => {
    state.acesChanged.push(payload);
  }),
  offerDoubleDown: true,
  setOfferDoubleDown: action((state, payload) => {
    state.offerDoubleDown = payload;
  }),
  doubleDown: false,
  setDoubleDown: action((state, payload) => {
    state.doubleDown = payload;
  }),
});
