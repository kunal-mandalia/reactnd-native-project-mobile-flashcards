import * as c from './constants'
import { AsyncStorage } from 'react-native'

/**
 * storage variable is used as dependency
 *  injection so it can be mocked for testing
 */
export const createDeckRequest = (title) => ({ type: c.CREATE_DECK_REQUEST, value: title })
export const createDeckSuccess = (title) => ({ type: c.CREATE_DECK_SUCCESS, value: title })
export const createDeckError = (error, title) => ({ type: c.CREATE_DECK_ERROR, error, value: title })
export const createDeck = (title, storage = AsyncStorage) => {
  return (dispatch) => {
    dispatch(createDeckRequest(title))

    storage.mergeItem(
      c.ASYNC_STORAGE_DECKS_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: []
        }
      })
    )
    .then((done) => {
      dispatch(createDeckSuccess(title))
    })
    .catch((error) => {
      dispatch(createDeckError(error, title))
    })

    // storage.getItem(c.ASYNC_STORAGE_DECKS_KEY)
    //   .then(data => {
    //     console.log('data key', data)
    //   })
  }
}
