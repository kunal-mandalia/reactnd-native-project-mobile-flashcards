import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CoreLayout from './Common/CoreLayout'
import Button from './Common/Button'
import Space from './Common/Space'
import Title from './Common/Title'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

class IndividualDeckView extends Component {
  static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.deckTitle || 'Deck' })  
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
                onPress={() => { }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})

export default connect(mapStateToProps)(IndividualDeckView)
