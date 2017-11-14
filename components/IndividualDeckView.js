import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import CoreLayout from './Common/CoreLayout'
import Button from './Common/Button'
import Space from './Common/Space'
import Title from './Common/Title'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { deleteDeck } from '../redux/actions'

class IndividualDeckView extends Component {
  static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.deckTitle || 'Deck' })  
  constructor (props) {
    super(props)
    this.state = {
      deck: null,
      error: false,
    }
    this.promptDeleteDeck = this.promptDeleteDeck.bind(this)
    this.deleteDeck = this.deleteDeck.bind(this)
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

  componentWillReceiveProps (nextProps) {
    const { decks, title } = nextProps
    if (nextProps.decks) {
      const deck = decks[title]
      if (deck) {
        this.setState({ deck })
      } else {
        this.setState({ error: true })
      }
    }
  }

  promptDeleteDeck () {
    const { title } = this.props
    Alert.alert(
      'Delete Deck',
      `Are you sure you want to delete the deck ${title}?`,
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'Delete', onPress: this.deleteDeck, style: 'destructive' },
      ],
      { cancelable: true }
    )
  }

  deleteDeck () {
    const { title, deleteDeck, navigation } = this.props
    deleteDeck(title)
    navigation.navigate('Home')
  }

  render () {
    const { title, navigation } = this.props
    const { deck } = this.state
    return (
      <CoreLayout>
        {deck
          ? (
            <View style={styles.container}>
              <Button
                width={'80%'}
                title='Add Card to Deck'
                onPress={() => { navigation.navigate('NewQuestionView', { deck })}}
              />
              <Space />
              <Button
                width={'80%'}
                btnStyle='primary-inverse'
                title={`Start Quiz ${deck.questions.length > 0 ? `(${deck.questions.length})` : ''}`}
                onPress={() => { navigation.navigate('QuizView', { deck })}}
                disabled={deck.questions.length === 0}
              />
              <Space />
              <Button
                justifySelf='flex-end'
                btnStyle='quaternary'
                width='80%'
                title='Delete Deck'
                onPress={this.promptDeleteDeck}
              />
            </View>
          )
          : (
            <AppLoading />
          )}
      </CoreLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  decks: state.decks,
  navigation: ownProps.navigation,
  title: ownProps.navigation.state.params.deckTitle,
  ownProps: ownProps,
})

const mapDispatchToProps = (dispatch) => ({
  deleteDeck: (title) => { dispatch(deleteDeck(title)) },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDeckView)
