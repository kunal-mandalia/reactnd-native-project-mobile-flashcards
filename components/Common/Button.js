import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, lightBlue ,purple, lightGrey, mediumGrey, darkGrey, transparent } from '../../utils/colors'

export const getButtonStyle = btnStyle => {
  switch (btnStyle) {
    case 'primary':
      return {
        color: white,
        borderColor: purple,
        backgroundColor: purple,
      }
    case 'primary-inverse':
      return {
        color: purple,
        backgroundColor: transparent,
        borderColor: purple,
      }
    case 'secondary':
      return {
        color: white,
        backgroundColor: darkGrey,
        borderColor: darkGrey,
      }
    case 'secondary-inverse':
      return {
        color: darkGrey,
        backgroundColor: transparent,
        borderColor: darkGrey,
      }
    case 'tertiary':
      return {
        color: white,
        backgroundColor: lightGrey,
        borderColor: lightGrey,
      }
    case 'quaternary':
      return {
        color: lightBlue,
        backgroundColor: transparent,
        borderColor: transparent,
      }
    default:
      return {
        color: white,
        borderColor: purple,
        backgroundColor: purple,
      }
  }
}

const Button = ({ btnStyle, title, onPress, width, style, disabled, borderWidth, marginVertical, ...rest }) => {
  const { color, borderColor, backgroundColor } = getButtonStyle(disabled ? 'tertiary' : btnStyle)
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor, borderWidth, borderColor, marginVertical, width }, style]} disabled={disabled} onPress={onPress} {...rest}>
      <Text style={{ color }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

Button.defaultProps = {
  btnStyle: 'primary',
  width: '100%',
  borderWidth: 2,
  disabled: false,
  marginVertical: 1,
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 2,
  },
})

export default Button