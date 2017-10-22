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
    default:
      return state
  }
}

export default reducer
