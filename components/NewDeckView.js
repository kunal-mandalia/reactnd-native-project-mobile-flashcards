import React, { Component } from 'react'
import { CoreLayout, InputText, Button } from './Common'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { connect } from 'react-redux'
import { createDeckRequest } from '../redux/actions'

class NewDeckView extends Component {
  state = {
    name: ''
  }

  onChangeText = (text) => {
    this.setState({ name: text })
  }

  onSubmit = () => {
    // update redux (update db from redux using then)
    this.props.createDeck(this.state.name)
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

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  createDeck: (title) => { dispatch(createDeckRequest(title)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckView)
