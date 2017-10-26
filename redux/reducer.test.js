import reducer, { initialState } from './reducer'
import { request, success, error, sampleData } from '../utils/helper'
import * as c from './constants'
import * as actions from './actions'

const mockDispatch = jest.fn()

afterEach(() => {
  mockDispatch.mockClear()
})

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

  it(`${c.ADD_CARD_TO_DECK_SUCCESS} should return correct state`, () => {
    const title = `React`
    const card = {
      question: `How can you test action within a component?`,
      answer: `Use mapStateToProps and mock action`
    }
    expect(reducer(initialState, actions.addCardToDeckSuccess(title, card))).toEqual({
      ...initialState,
      decks: {
        ...initialState.decks,
        [title]: {
          questions: [card]
        }
      },
      status: success
    })
  })
})
