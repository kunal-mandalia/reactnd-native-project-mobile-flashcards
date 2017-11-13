import * as c from './constants'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

/**
 * storage variable is used as dependency
 *  injection so it can be mocked for testing
 */
export const getDecksRequest = () => ({ type: c.GET_DECKS_REQUEST })
export const getDecksSuccess = (decks) => ({ type: c.GET_DECKS_SUCCESS, value: decks })
export const getDecksError = (error) => ({ type: c.GET_DECKS_ERROR, error })
export const getDecks = (storage = AsyncStorage) => {
  return (dispatch) => {
    dispatch(getDecksRequest())
    storage.getItem(c.ASYNC_STORAGE_DECKS_KEY)
    .then((decks) => {
      const d = decks ? JSON.parse(decks) : {}
      dispatch(getDecksSuccess(d))
    })
    .catch((error) => {
      dispatch(getDecksError(error))
    })
  }
}

export const saveDeckTitleRequest = (title) => ({ type: c.SAVE_DECK_TITLE_REQUEST, value: title })
export const saveDeckTitleSuccess = (title) => ({ type: c.SAVE_DECK_TITLE_SUCCESS, value: title })
export const saveDeckTitleError = (error, title) => ({ type: c.SAVE_DECK_TITLE_ERROR, error, value: title })
export const saveDeckTitle = (title, storage = AsyncStorage) => {
  return (dispatch) => {
    dispatch(saveDeckTitleRequest(title))
    storage.mergeItem(c.ASYNC_STORAGE_DECKS_KEY, JSON.stringify({ [title]: { title, questions: [] }}))
    .then((done) => {
      dispatch(saveDeckTitleSuccess(title))
    })
    .catch((error) => {
      dispatch(saveDeckTitleError(error, title))
    })
  }
}

export const addCardToDeckRequest = (title, card) => ({ type: c.ADD_CARD_TO_DECK_REQUEST, title, card })
export const addCardToDeckSuccess = (title, card) => ({ type: c.ADD_CARD_TO_DECK_SUCCESS, title, card })
export const addCardToDeckError = (error) => ({ type: c.ADD_CARD_TO_DECK_ERROR, error })
export const addCardToDeck = (title, card, storage = AsyncStorage) => {
  return (dispatch) => {
    dispatch(addCardToDeckRequest(title, card))
    storage.getItem(c.ASYNC_STORAGE_DECKS_KEY)
    .then((decks) => {
      const allDecks = JSON.parse(decks)
      const deckCards = { title, questions: allDecks[title].questions.concat(card) }
      return storage.mergeItem(c.ASYNC_STORAGE_DECKS_KEY, JSON.stringify({ [title]: deckCards }))
      .then(
        response => dispatch(addCardToDeckSuccess(title, card)),
        error => dispatch(addCardToDeckError(error))
      )
      .catch(error => dispatch(addCardToDeckError(error)))
    })
    .catch((error) => {
      dispatch(addCardToDeckError(error))
    })
  }
}

export const clearLocalNotification = (storage = AsyncStorage) => {
  return (dispatch) => {
    return storage.removeItem(c.NOTIFICATION_KEY)
      .then(storage.cancelAllScheduledNotificationsAsync())
  }
}

export const createNotification = () => ({
  title: 'Log your stats',
  body: `Don't forget to log your stats`,
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: false,
  }
})

export const setLocalNotification = (notifications = Notifications,storage = AsyncStorage, permissions = Permissions) => {
  return (dispatch) => {
    storage.getItem(c.NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        permissions.askAsync(permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === 'granted') {
            notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(18)
            tomorrow.setMinutes(0)

            notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day'
              }
            )
          }

          storage.setItem(c.NOTIFICATION_KEY, JSON.stringify(true))
        })
      }
    })
  }
}