export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

function addCard(deckTitle, card) {
  return {
    add
  };
}