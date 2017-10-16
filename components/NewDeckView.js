import React, { Component } from 'react'
import { CoreLayout, InputText, Button } from './Common'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'

class NewDeckView extends Component {
  state = {
    name: ''
  }

  onChangeText = (text) => {
    this.setState({ name: text })
  }

  onSubmit = () => {
    // update redux (update db from redux using then)
    console.log('NewDeckView: Submit', this.state.name)
  }
  
  render () {
    const { name } = this.props
    return (
      <CoreLayout>
          <InputText
            placeholder='Deck name'
            value={name}
            onChangeText={this.onChangeText}
          />
          <Button
            title='Create'
            onPress={this.onSubmit}
          />
      </CoreLayout>
    )
  }
}

export default NewDeckView
