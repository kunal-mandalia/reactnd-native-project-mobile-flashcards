import React, { Component } from 'react'
import { View, Text } from 'react-native'

class QuizView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeQuestion: 0,
      answers: []
    }
  }

  render () {
    const { activeQuestion, answers } = this.state
    return (
      <View>
        <Text>QuizView</Text>
      </View>
    )
  }
}

export default QuizView
