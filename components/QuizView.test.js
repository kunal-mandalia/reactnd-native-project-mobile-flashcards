import '../utils/test.config.js'
import React from 'react'
import { shallow } from 'enzyme'
import QuizView from './QuizView'
import { sampleData } from '../utils/helper'

const props = {
  navigation: {
    state: {
      params: {
        deck: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            }
          ]
        }
      }
    }
  }
}

describe(`<QuizView .../>`, () => {
  const wrapper = shallow(<QuizView {...props} />)  

  it(`should show flashcard if quiz has not been completed`, () => {
    expect(wrapper.find('FlashCard')).toHaveLength(1)
  })

  it(`should track response to flashcard question`, () => {
    wrapper.find('FlashCard').dive().find('.btn-correct').simulate('press')
    expect(wrapper.state().myAnswers).toEqual([true])
  })

  it(`should show results after completing quiz`, () => {
    wrapper.find('FlashCard').dive().find('.btn-incorrect').simulate('press')    
    expect(wrapper.state().myAnswers).toEqual([true, false])
    wrapper.update()
    expect(wrapper.find('Results')).toHaveLength(1)
  })
})
