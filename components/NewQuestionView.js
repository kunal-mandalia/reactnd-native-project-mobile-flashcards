import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { InputText, Button } from './Common'
import { addCardToDeck } from '../redux/actions'

export class NewQuestionView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      question: ``,
      answer: ``
    }
    this.onChangeQuestion = this.onChangeQuestion.bind(this)
    this.onChangeAnswer = this.onChangeAnswer.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChangeQuestion (value) {
    this.setState({ question: value })
  }

  onChangeAnswer (value) {
    this.setState({ answer: value })    
  }

  onSubmit () {
    const { deckTitle } = this.props.navigation.state.params
    const card = this.state
    this.props.addCardToDeck(deckTitle, card)
  }

  render () {
    const { deckTitle } = this.props.navigation.state.params
    return (
      <View>
        <Text>Add a question to {deckTitle}</Text>
        <InputText className='question' placeholder='Question' onChangeText={this.onChangeQuestion} />
        <InputText className='answer' placeholder='Answer' onChangeText={this.onChangeAnswer} />
        <Button className='submit' onPress={this.onSubmit}>Go!</Button>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionView)
