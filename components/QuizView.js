import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Title } from './Common'

const Progress = ({ myAnswers, totalQuestions }) => {
  return <Text style={styles.progress}>{myAnswers.length} / {totalQuestions}</Text>  
}

const Score = ({ myAnswers }) => {
  const percent = Math.round(100 * myAnswers.filter(a => a === true).length / myAnswers.length)
  return (
    <View>
      <Text>{percent}%</Text>
    </View>
  )
}

const FlashCard = ({ question, answer, showAnswer, onShowAnswer, onHideAnswer, onAnswer}) => {
  const node = showAnswer ? (
    <View style={styles.flashCardTop}>
      <Text style={styles.displayText}>{answer}</Text>
      <Button title='Show Question' onPress={onHideAnswer} />
    </View>
  ) : (
    <View style={styles.flashCardTop}>
      <Text style={styles.displayText}>{question}</Text>
      <Button title='Show Answer' onPress={onShowAnswer} />
    </View>
  )
  return (
    <View style={styles.flashCard}>
      {node}
      <View style={styles.responseContainer}>
        <Button className='btn-correct' title='answer - correct' onPress={() => { onAnswer(true) }} width={'50%'} />
        <Button className='btn-incorrect' title='answer - incorrect' onPress={() => { onAnswer(false) }} width={'50%'} />
      </View>
    </View>
  )
}

const Results = ({ myAnswers }) => {
  return (
    <View>
      <Score myAnswers={myAnswers} />
    </View>
  )
}

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
      ? <Results myAnswers={myAnswers} />
      : <FlashCard
          question={questions[activeQuestion].question}
          answer={questions[activeQuestion].answer}
          showAnswer={showAnswer}
          onShowAnswer={this.onShowAnswer}
          onHideAnswer={this.onHideAnswer}
          onAnswer={this.onAnswer}
        />
    
    return (
      <View style={styles.container}>
        <Title text={showAnswer ? 'Answer' : 'Question'} />
        <Progress myAnswers={myAnswers} totalQuestions={deck.questions.length} />
        {node}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  flashCard: {
    flex: 1,
    alignItems: 'center',
  },
  displayText: {
    fontSize: 22,
    margin: 8,
  },
  progress: {
    fontSize: 18,
  },
  responseContainer: {
    flexDirection: 'row',
  },
  flashCardTop: {
    alignItems: 'center',
  },
  responseButton: {
    // flex: 1,
    color: 'black',
    padding: 4,
  }
})

export default QuizView
