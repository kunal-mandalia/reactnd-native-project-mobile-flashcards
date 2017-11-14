import React, {Component} from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { white, lightGrey, black, purple, lightBlue, transparent, mediumGrey, darkGrey } from '../../utils/colors'

class InputText extends Component {
  state = {
    isFocused: false,
  }

  onFocus = () => { this.setState({ isFocused: true })}
  onBlur = () => { this.setState({ isFocused: false })}

  render () {
    const { isFocused } = this.state
    return (
      <TextInput
        style={[styles.control, isFocused ? styles.focus : styles.blur ]}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        {...this.props}
      />
    )
  }
}

const styles = StyleSheet.create({
  control: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: transparent,
    borderRadius: 4,
    borderBottomColor: mediumGrey,
    borderBottomWidth: 4,    
    padding: 12,
    width: '100%',
    marginVertical: 4,
  },
  focus: {
    borderBottomColor: lightBlue,
  },
  blur: {
  }
})

export default InputText
