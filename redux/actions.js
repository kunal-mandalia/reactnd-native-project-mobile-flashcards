import * as c from './constants'

export const createDeckRequest = (title) => ({ type: c.CREATE_DECK_REQUEST, value: title })
