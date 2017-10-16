import * as actions from './actions'
import * as c from './constants'

describe(`actions`, () => {
  describe(`createDeckRequest`, () => {
    const title = 'Jungian Psychology'
    const expectedOutput = { type: c.CREATE_DECK_REQUEST, value: title }
    it(`should return ${JSON.stringify(expectedOutput)} given title ${title}`, () => {
      expect(actions.createDeckRequest(title)).toEqual(expectedOutput)
    })
  })
})
