import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Title } from './Common'
import { white, red, green, lightBlue, darkGrey } from '../utils/colors'

const Progress = ({ isQuestion, myAnswers, totalQuestions }) => {
  return <Text style={styles.progress}>{isQuestion ? 'Question: ' : 'Answer: '} {myAnswers.length} / {totalQuestions}</Text>  
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
    <View style={styles.flashCardQuestion}>
      <Text style={styles.displayText}>{`${answer}`}</Text>
      <Button
        title='Show Question'
        color={lightBlue}
        backgroundColor='transparent'  
        onPress={onHideAnswer} />
    </View>
  ) : (
    <View style={styles.flashCardQuestion}>
      <Text style={styles.displayText}>{`${question}`}</Text>
      <Button
        title='Show Answer'
        color={lightBlue}
        backgroundColor='transparent'        
        onPress={onShowAnswer} />
    </View>
  )
  return (
    <View style={styles.flashCard}>
      {node}
      <View style={styles.flashCardActions}>
        <View style={styles.row}>
          <Button width='45%' color={white} backgroundColor={red} className='btn-incorrect' title='Incorrect' onPress={() => { onAnswer(false) }} />
          <View style={styles.actionSpace} />
          <Button width='45%' color={white} backgroundColor={green} className='btn-correct' title='Correct' onPress={() => { onAnswer(true) }} />
        </View>
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
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  flashCardQuestion: {
    flex: 1,
    alignItems: 'center',
    padding: '2%',
  },
  flashCardActions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12,
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
})

export default QuizView
