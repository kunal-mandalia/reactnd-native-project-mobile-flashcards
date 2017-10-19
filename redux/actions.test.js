import * as actions from './actions'
import * as c from './constants'
import { mockPromise } from 'mock-promise-thunk'

describe(`actions`, () => {
  const mockDispatch = jest.fn()
  
  beforeEach(() => {
    mockDispatch.mockClear()
  })

  describe(`createDeckRequest`, () => {
    const title = 'Jungian Psychology'
    const expectedOutput = { type: c.CREATE_DECK_REQUEST, value: title }
    it(`should return ${JSON.stringify(expectedOutput)} given title ${title}`, () => {
      expect(actions.createDeckRequest(title)).toEqual(expectedOutput)
    })
  })

  describe(`createDeck`, () => {
    const title = 'Node Streams'

    it(`should dispatch request and success actions on resolve`, () => {
      const actionStack = [{ response: title }]
      const mockPromiseLib = { mergeItem: mockPromise(actionStack) }
      actions.createDeck(title, mockPromiseLib)(mockDispatch)

      expect(mockDispatch.mock.calls[0][0]).toEqual(actions.createDeckRequest(title))
      expect(mockDispatch.mock.calls[1][0]).toEqual(actions.createDeckSuccess(title))
      expect(mockDispatch.mock.calls.length).toEqual(2)
    })
    

    it(`should dispatch request and error actions on reject`, () => {
      const error = 400
      const actionStack = [{ error }]
      const mockPromiseLib = { mergeItem: mockPromise(actionStack) }
      actions.createDeck(title, mockPromiseLib)(mockDispatch)
      
      expect(mockDispatch.mock.calls[0][0]).toEqual(actions.createDeckRequest(title))
      expect(mockDispatch.mock.calls[1][0]).toEqual(actions.createDeckError(error, title))
      expect(mockDispatch.mock.calls.length).toEqual(2)
    })
  })
})