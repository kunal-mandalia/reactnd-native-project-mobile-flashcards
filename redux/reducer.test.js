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

  it(`${c.ADD_CARD_TO_DECK_SUCCESS} should return correct state`, () => {
    const cardProps = {
      title: 'Parent Deck',
      card: {
        question: 'Card Q',
        answer: 'Card A',
      }
    }
    expect(reducer(initialState, actions.addCardToDeckSuccess(cardProps.title, {...cardProps.card}))).toEqual({
      ...initialState,
      decks: {
        ...initialState.decks,
        [cardProps.title]: {
          title: cardProps.title,
          questions: [{...cardProps.card}]
        }
      },
      status: success
    })
  })

  it(`${c.DELETE_DECK_SUCCESS} should return correct state`, () => {
    const initialState = {
      decks: {
        Magic: {
          title: 'Magic',
          questions: [
            {
              question: 'Did David Blane levitate?',
              answer: 'Of course'
            }
          ]
        },
      },
      status: success      
    }
    const title = 'Magic'

    expect(reducer(initialState, actions.deleteDeckSuccess(title))).toEqual({ decks: {}, status: success })
  })
})
