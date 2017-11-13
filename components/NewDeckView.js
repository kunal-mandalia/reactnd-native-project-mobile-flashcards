import React, { Component } from 'react'
import { CoreLayout, InputText, Button } from './Common'
import { Keyboard, TouchableWithoutFeedback, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../redux/actions.js'
import { navigation } from 'react-navigation'
class NewDeckView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `New Deck`,
  })

  state = {
    name: ''
  }

  onChangeText = (text) => {
    this.setState({ name: text })
  }

  onSubmit = () => {
    const { name } = this.state
    const { saveDeckTitle, navigation } = this.props
    saveDeckTitle(name)
    navigation.navigate('IndividualDeckView', { deckTitle: name })
  }
  
  render () {
    const { name } = this.state
    return (
      <CoreLayout>
        <InputText
          placeholder='Deck name'
          value={name}
          onChangeText={this.onChangeText}
        />
        <Button
          style={{ marginTop: 6 }}
          title='Create'
          onPress={this.onSubmit}
          disabled={name === ''}
        />
      </CoreLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  decks: state,
  navigation: ownProps.navigation
})

const mapDispatchToProps = (dispatch) => ({
  saveDeckTitle: (title) => { dispatch(saveDeckTitle(title)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckView)
