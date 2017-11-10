import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { CoreLayout, InputText, Button } from './Common'
import { addCardToDeck } from '../redux/actions'
import { white, purple, mediumGrey, darkGrey } from '../utils/colors'

export class NewQuestionView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `New Card`
  })

  constructor (props) {
    super(props)
    this.state = {
      question: ``,
      answer: ``
    }
    this.onChangeQuestion = this.onChangeQuestion.bind(this)
    this.onChangeAnswer = this.onChangeAnswer.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onChangeQuestion (value) {
    this.setState({ question: value })
  }

  onChangeAnswer (value) {
    this.setState({ answer: value })    
  }

  onSubmit () {
    const { navigation, addCardToDeck } = this.props
    const { deck } = navigation.state.params
    const card = this.state
    // Todo fix navigation params so correct new number of
    // cards shown on IndividualDeckView
    navigation.setParams({
      deck: {
        title: deck.title,
        questions: deck.questions.concat({...card})
      }
    })
    addCardToDeck(deck.title, card)
    navigation.goBack()
  }

  onCancel () {
    const { navigation } = this.props
    navigation.goBack()
  }

  render () {
    const { question, answer } = this.state
    const { deck } = this.props.navigation.state.params
    const waiting = question === '' || answer === ''
    return (
      <CoreLayout>
        <Text style={styles.title}>Add a card to {deck.title}</Text>
        <InputText className='question' placeholder='Question' onChangeText={this.onChangeQuestion} />
        <InputText className='answer' placeholder='Answer' onChangeText={this.onChangeAnswer} />
        <View style={styles.buttonsContainer}>
          <Button
            btnStyle='secondary'
            width={'49%'}
            className='cancel'
            onPress={this.onCancel}
            title='Cancel'
          />
          <Button
            disabled={waiting}
            width={'49%'}
            color={white}
            backgroundColor={waiting ? mediumGrey : purple}
            className='submit'
            onPress={this.onSubmit}
            title='Create'            
          />
        </View>
      </CoreLayout>
    )
  }
}

NewQuestionView.propTypes = {
  navigation: PropTypes.object.isRequired,
  addCardToDeck: PropTypes.func.isRequired
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  addCardToDeck: (deckTitle, card) => { dispatch(addCardToDeck(deckTitle, card)) }
})

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 12,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionView)
