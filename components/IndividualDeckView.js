import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CoreLayout from './Common/CoreLayout'
import Button from './Common/Button'
import Space from './Common/Space'
import Title from './Common/Title'
import { connect } from 'react-redux'

// Convert to class and get deck from store
// navigationOptions set within lifecycle? if not, use title
// const IndividualDeckView = ({ navigation }) => {
//   const { deck } = navigation.state.params
//   return (
//     <CoreLayout marginTop>
//       <Button
//         width='80%'
//         title='Add Card'
//         onPress={() => { navigation.navigate('NewQuestionView', { deck })}}
//       />
//       <Space />
//       <Button
//         width='80%'
//         title='Start Quiz'
//         onPress={() => { navigation.navigate('QuizView', { deck })}}
//         disabled={deck.questions.length === 0}
//       />
//       <Space />
//       <Title size={16} text={`${deck.questions.length} ${deck.questions.length === 1 ? 'card' : 'cards'}`} />
//     </CoreLayout>
//   )
// }
// IndividualDeckView.navigationOptions = ({ navigation }) => ({ title: navigation.state.params.deck.title || 'Deck' })

class IndividualDeckView extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      deck: null,
      error: false,
    }
  }

  componentDidMount () {
    const { title, decks } = this.props
    const deck = decks[title]
    if (deck) {
      this.setState({ deck })
    } else {
      this.setState({ error: true })
    }
  }

  render () {
    const { title } = this.props
    const { deck } = this.state
    return (
      <CoreLayout>
        {deck
          ? (
            <View style={{ flex: 1 }}>
              <Button
                width='80%'
                title='Add Card'
                onPress={() => { navigation.navigate('NewQuestionView', { deck })}}
              />
              <Space />
              <Button
                width='80%'
                title='Start Quiz'
                onPress={() => { navigation.navigate('QuizView', { deck })}}
                disabled={deck.questions.length === 0}
              />
            </View>
          )
          : (
            <Text>Trouble finding deck {title}</Text>            
          )}
      </CoreLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  decks: state.decks,
  title: ownProps.navigation.state.params.deckTitle,
})

export default connect(mapStateToProps)(IndividualDeckView)
