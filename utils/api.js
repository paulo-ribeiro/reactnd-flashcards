import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const DECKS_STORAGE_KEY = "Flashcards::decks";
const NOTIFICATION_KEY = "Flashcards::notifications";

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

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function createNotification() {
  return {
    title: "Take a quiz!",
    body: "Dont forget to take a quiz and study for today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    })
}