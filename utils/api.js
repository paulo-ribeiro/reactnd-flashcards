import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = "Flashcards::decks";

export const fetchDecks = () =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => JSON.parse(results));

export const saveDeck = deck =>
  AsyncStorage
    .mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [deck.title]: deck
    }));


export const saveCard = (deckTitle, card) => {
  return fetchDecks()
    .then(decks => {
      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deckTitle]: {
          ...decks[deckTitle],
          questions: decks[deckTitle].questions.concat(card)
        }
      }));
    });
};