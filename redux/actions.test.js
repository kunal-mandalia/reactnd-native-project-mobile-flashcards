import * as actions from './actions'
import * as c from './constants'

const mockPromise = (isResolved, resolve = 'Success', reject = null) => jest.fn((cb) => ({
  then: (cb) => {
    if (isResolved) cb(resolve)
    return {
      catch: (cb) => {
        if (!isResolved) cb(reject)
      }
    }
  }
}))
const mockDispatch = jest.fn()

describe(`actions`, () => {
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
    let isResolved
    const resolve = JSON.stringify({ [title]: { title, questions: [] }})
    const reject = `Async Storage not available`

    it(`should dispatch request and success actions on resolve`, () => {
      const mockStorage = {
        mergeItem: mockPromise(true, resolve, reject)
      }
      const createDeckActions = actions.createDeck(title, mockStorage)(mockDispatch)
      expect(mockDispatch.mock.calls[0][0]).toEqual(actions.createDeckRequest(title))
      expect(mockDispatch.mock.calls[1][0]).toEqual(actions.createDeckSuccess(title))
      expect(mockDispatch.mock.calls.length).toEqual(2)
    })

    it(`should dispatch request and error actions on reject`, () => {
      const mockStorage = {
        mergeItem: mockPromise(false, resolve, reject)
      }
      const createDeckActions = actions.createDeck(title, mockStorage)(mockDispatch)
      expect(mockDispatch.mock.calls[0][0]).toEqual(actions.createDeckRequest(title))
      expect(mockDispatch.mock.calls[1][0]).toEqual(actions.createDeckError(reject, title))
      expect(mockDispatch.mock.calls.length).toEqual(2)
    })
  })
})