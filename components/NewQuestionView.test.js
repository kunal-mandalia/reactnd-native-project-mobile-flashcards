import '../utils/test.config.js'
import React from 'react'
import { NewQuestionView } from './NewQuestionView'
import { shallow } from 'enzyme'

const props = {
  navigation: {
    dispatch: jest.fn(),
    goBack: jest.fn(),
    state: {
      key: 'id-1508889104572-2',
      params: {
        deckTitle: 'Audiobook narrators'
      }
    }
  },
  addCardToDeck: jest.fn()
}

describe(`<NewQuestionView .../>`, () => {
  it(`should call createQuestion when submitting a new question`, () => {
    const question = `The answer to life`
    const answer = `42`
    const wrapper = shallow(<NewQuestionView {...props} />)
    wrapper.find('.question').simulate('changeText', question)
    wrapper.find('.answer').simulate('changeText', answer)
    wrapper.update()
    expect(wrapper.state().question).toEqual(question)
    expect(wrapper.state().answer).toEqual(answer)

    wrapper.find('.submit').simulate('press')
    expect(props.addCardToDeck).toBeCalledWith(props.navigation.state.params.deckTitle, { question, answer })
  })
})
