import * as c from './constants'
import { request, success, error } from '../utils/helper'

export const initialState = {
  decks: {
    titles: []
  },
  status: {
    loaded: false,
    loading: false,
    error: false
  }
}
// TODO: handle async actions
const reducer = (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case c.GET_DECKS_REQUEST:
      return {
        ...state,
        status: request
      }
    case c.GET_DECKS_SUCCESS:
      return {
        ...state,
        decks: action.value,
        status: success
      }
    case c.SAVE_DECK_TITLE_SUCCESS: {
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.value]: {
            title: action.value,
            questions: []
          }
        }
      }
    }
    case c.ADD_CARD_TO_DECK_REQUEST: {
      return {
        ...state,
        status: request,
      }
    }
    case c.ADD_CARD_TO_DECK_SUCCESS: {
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: {
            title: action.title,
            questions: state.decks[action.title].questions.concat({...action.card})
          }
        },
        status: success,
      }
    }
    default:
      return state
  }
}

export default reducer
