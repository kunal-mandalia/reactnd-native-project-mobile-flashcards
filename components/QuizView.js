import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from './Common'

const Progress = ({ activeQuestion, totalQuestions }) => (
  <Text>{activeQuestion} / {totalQuestions}</Text>
)

const FlashCard = ({ question, answer, showAnswer, onShowAnswer, onHideAnswer, onAnswer}) => {
  return (
    <View>
      <Text>{showAnswer ? `Answer: ${answer}` :  `Question: ${question}`}</Text>
      <Button title='show answer' onPress={onShowAnswer} />
      <Button title='hide answer' onPress={onHideAnswer} />
      <Button className='btn-incorrect' title='answer - incorrect' onPress={() => { onAnswer(false) }} />
      <Button className='btn-correct' title='answer - correct' onPress={() => { onAnswer(true) }} />
    </View>
  )
}

const Results = () => {
  return (
    <View>
      <Text>Finito!</Text>
    </View>
  )
}

// TODO: <Result onRetry showDetails />

class QuizView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeQuestion: 0,
      myAnswers: [],
      questions: props.navigation.state.params.deck.questions,
      showAnswer: false,
    }
  }

  onShowAnswer = () => { this.setState({ showAnswer: true })}
  onHideAnswer = () => { this.setState({ showAnswer: false })}
  onAnswer = (isCorrect) => {
    this.setState(state => ({
      myAnswers: state.myAnswers.concat(isCorrect),
      activeQuestion: state.activeQuestion + 1
    }))
  }

  render () {
    const { activeQuestion, myAnswers, showAnswer } = this.state
    const { deck } = this.props.navigation.state.params
    const { title, questions } = deck
    const node = myAnswers.length === questions.length
      ? <Results />
      : <FlashCard
          question={questions[activeQuestion].question}
          answer={questions[activeQuestion].answer}
          showAnswer={showAnswer}
          onShowAnswer={this.onShowAnswer}
          onHideAnswer={this.onHideAnswer}
          onAnswer={this.onAnswer}
        />
    
    return (
      <View>
        <Text>QuizView</Text>
        <Text>{JSON.stringify(this.state)}</Text>
        <Progress activeQuestion={activeQuestion + 1} totalQuestions={deck.questions.length} />
        {node}
      </View>
    )
  }
}

export default QuizView
