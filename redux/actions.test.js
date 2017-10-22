import * as actions from './actions'
import * as c from './constants'
import { mockPromise } from 'mock-promise-thunk'
import { sampleData } from '../utils/helper'

describe(`actions`, () => {
  const mockDispatch = jest.fn()
  
  beforeEach(() => {
    mockDispatch.mockClear()
  })

  describe(`saveDeckTitleRequest`, () => {
    const title = 'Jungian Psychology'
    const expectedOutput = { type: c.SAVE_DECK_TITLE_REQUEST, value: title }
    it(`should return ${JSON.stringify(expectedOutput)} given title ${title}`, () => {
      expect(actions.saveDeckTitleRequest(title)).toEqual(expectedOutput)
      expect(true).toBe(true)
    })
  })

  describe(`getDecks`, () => {
    it(`should dispatch request and success actions on resolve`, () => {
      const decks = sampleData.decks
      const actionStack = [{ response: JSON.stringify(decks) }]
      const mockPromiseLib = { getItem: mockPromise(actionStack) }
      actions.getDecks(mockPromiseLib)(mockDispatch)

      expect(mockDispatch.mock.calls[0][0]).toEqual(actions.getDecksRequest())
      expect(mockDispatch.mock.calls[1][0]).toEqual(actions.getDecksSuccess(decks))
      expect(mockDispatch.mock.calls.length).toEqual(2)
    }) 
  })

  describe(`saveDeckTitle`, () => {
    const title = 'Node Streams'

    it(`should dispatch request and success actions on resolve`, () => {
      const actionStack = [{ response: title }]
      const mockPromiseLib = { mergeItem: mockPromise(actionStack) }
      actions.saveDeckTitle(title, mockPromiseLib)(mockDispatch)

      expect(mockDispatch.mock.calls[0][0]).toEqual(actions.saveDeckTitleRequest(title))
      expect(mockDispatch.mock.calls[1][0]).toEqual(actions.saveDeckTitleSuccess(title))
      expect(mockDispatch.mock.calls.length).toEqual(2)
    })

    it(`should dispatch request and error actions on reject`, () => {
      const error = 400
      const actionStack = [{ error }]
      const mockPromiseLib = { mergeItem: mockPromise(actionStack) }
      actions.saveDeckTitle(title, mockPromiseLib)(mockDispatch)
      
      expect(mockDispatch.mock.calls[0][0]).toEqual(actions.saveDeckTitleRequest(title))
      expect(mockDispatch.mock.calls[1][0]).toEqual(actions.saveDeckTitleError(error, title))
      expect(mockDispatch.mock.calls.length).toEqual(2)
    })
  })

  describe(`addCardToDeck`, () => {
    const card = {
      title: 'Magic',
      questions: [
        {
          question: 'Did David Blane levitate?',
          answer: 'Of course'
        }
      ]
    }
    const decks = { [card.title]: card, titles: [card.title] }

    it(`should dispatch request and success actions on resolve`, () => {
      const getItemStack = [{ response: JSON.stringify(decks) }]
      const mergeItemStack = [{ response: { title: card.title, card } }]

      const mockPromiseLib = {
        getItem: mockPromise(getItemStack),
        mergeItem: mockPromise(mergeItemStack),
      }
      actions.addCardToDeck(card.title, card, mockPromiseLib)(mockDispatch)

      expect(mockDispatch.mock.calls[0][0]).toEqual(actions.addCardToDeckRequest(card.title, card))
      expect(mockDispatch.mock.calls[1][0]).toEqual(actions.addCardToDeckSuccess(card.title, card))
      expect(mockDispatch.mock.calls.length).toEqual(2)
    })

    it(`should dispatch request and error actions on reject`, () => {
      const error = 'Bad request'
      const getItemStack = [{ response: JSON.stringify(decks) }]
      const mergeItemStack = [{ error }]

      const mockPromiseLib = {
        getItem: mockPromise(getItemStack),
        mergeItem: mockPromise(mergeItemStack),
      }
      actions.addCardToDeck(card.title, card, mockPromiseLib)(mockDispatch)

      expect(mockDispatch.mock.calls[0][0]).toEqual(actions.addCardToDeckRequest(card.title, card))
      expect(mockDispatch.mock.calls[1][0]).toEqual(actions.addCardToDeckError(error))
      expect(mockDispatch.mock.calls.length).toEqual(2)
    })
  })
})