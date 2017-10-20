import * as actions from './actions'
import * as c from './constants'
import { mockPromise } from 'mock-promise-thunk'

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
      const decks = { 'History': { title: 'History' }}
      const actionStack = [{ response: decks }]
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
})