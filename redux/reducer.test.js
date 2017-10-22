import reducer, { initialState } from './reducer'
import { request, success, error, sampleData } from '../utils/helper'
import * as c from './constants'
import * as actions from './actions'


describe(`reducer()`, () => {
  it(`should return initialState`, () => {
    expect(reducer()).toEqual(initialState)
  })

  it(`${c.GET_DECKS_REQUEST} should return correct state`, () => {
    expect(reducer(initialState, actions.getDecksRequest())).toEqual({
      ...initialState,
      status: request
    })
  })

  it(`${c.GET_DECKS_SUCCESS} should return correct state`, () => {
    expect(reducer(initialState, actions.getDecksSuccess(sampleData.decks))).toEqual({
      ...initialState,
      decks: sampleData.decks,
      status: success
    })
  })
})
