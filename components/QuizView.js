import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Title, Space } from './Common'
import { white, red, green, lightBlue, darkGrey, mediumGrey, lightGrey, purple, transparent } from '../utils/colors'
import ProgressCircle from 'react-native-progress-circle'

const Progress = ({ isQuestion, myAnswers, totalQuestions }) => {
  let text = myAnswers.length === totalQuestions
    ? 'Finished Quiz'
    : (`${isQuestion ? `Question` : `Answer`} ${myAnswers.length} of ${totalQuestions}`)
  return <Text style={styles.progress}>{text}</Text>  
}

const Score = ({ myAnswers }) => {
  const percent = Math.round(100 * myAnswers.filter(a => a === true).length / myAnswers.length)
  return (
    <View>
      <Text>{percent}%</Text>
    </View>
  )
}

const FlashCard = ({ question, answer, showAnswer, onShowAnswer, onHideAnswer, onAnswer }) => {
  const node = showAnswer ? (
    <View style={styles.flashCardQuestion}>
      <Text style={styles.displayText}>{`${answer}`}</Text>
      <Button
        btnStyle='quaternary'
        title='Show Question'
        onPress={onHideAnswer} />
    </View>
  ) : (
    <View style={styles.flashCardQuestion}>
      <Text style={styles.displayText}>{`${question}`}</Text>
      <Button
        btnStyle='quaternary'
        title='Show Answer'
        onPress={onShowAnswer} />
    </View>
  )
  return (
    <View style={styles.flashCard}>
      {node}
      <View style={styles.flashCardActions}>
        <View style={styles.row}>
          <Button btnStyle='primary-inverse' width='49%' className='btn-incorrect' title='Incorrect' onPress={() => { onAnswer(false) }} />
          <View style={styles.actionSpace} />
          <Button width='49%' className='btn-correct' title='Correct' onPress={() => { onAnswer(true) }} />
        </View>
      </View>
    </View>
  )
}

const Results = ({ myAnswers, onRestartQuiz, goBack }) => {
  const correct = myAnswers.filter(a => a === true).length
  const total = myAnswers.length
  const percent = Math.round(100 * correct / total)
  return (
    <View style={styles.resultsContainer}>
      <View style={styles.resultsStats}>
        <ProgressCircle
          percent={percent}
          radius={100}
          borderWidth={10}
          color={lightBlue}
          shadowColor={lightGrey}
          bgColor={white}
        >
          <Text style={{ fontSize: 26 }}>{`${percent}%`}</Text>
          <Space />
          <Text style={{ fontSize: 18 }}>{`${correct}/${total}`}</Text>
        </ProgressCircle>
      </View>
      <View style={styles.resultsActions}>
        <Button
          btnStyle='primary-inverse'
          width='49%'
          className='btn-incorrect'
          title='Back to Deck'
          onPress={goBack} />
        <Button
          btnStyle='primary'
          width='49%'
          className='btn-incorrect'
          title='Restart Quiz'
          onPress={onRestartQuiz} />
      </View>
    </View>
  )
}

class QuizView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Quiz: ${navigation.state.params.deck.title}`,
     headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    })

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
      activeQuestion: state.activeQuestion + 1,
    }))
  }

  onRestartQuiz = () => { this.setState({ activeQuestion: 0, myAnswers: [] }) }
  goBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { activeQuestion, myAnswers, showAnswer } = this.state
    const { deck } = this.props.navigation.state.params
    const { title, questions } = deck
    const node = myAnswers.length === questions.length
      ? <Results myAnswers={myAnswers} onRestartQuiz={this.onRestartQuiz} goBack={this.goBack} />
      : <FlashCard
          question={questions[activeQuestion].question}
          answer={questions[activeQuestion].answer}
          showAnswer={showAnswer}
          onShowAnswer={this.onShowAnswer}
          onHideAnswer={this.onHideAnswer}
          onAnswer={this.onAnswer}
          onRestartQuiz={this.onRestartQuiz}
        />
    
    return (
      <View style={styles.container}>
        <Progress isQuestion={!showAnswer} myAnswers={myAnswers} totalQuestions={deck.questions.length} />
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  flashCardQuestion: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashCardActions: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionSpace: {
    padding: 4,
  },
  title: {
    fontSize: 16,
    margin: 12,
  },
  displayText: {
    fontSize: 22,
    margin: 8,
  },
  progress: {
    fontSize: 16,
    color: darkGrey,
  },
  resultsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  resultsStats: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default QuizView
