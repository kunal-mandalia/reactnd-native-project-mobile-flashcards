import * as c from './constants'
import { AsyncStorage } from 'react-native'

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
    .then((response) => {
      dispatch(getDecksSuccess(response))
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

    // storage.getItem(c.ASYNC_STORAGE_DECKS_KEY)
    //   .then(data => {
    //     console.log('data key', data)
    //   })