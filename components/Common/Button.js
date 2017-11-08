import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, purple, mediumGrey } from '../../utils/colors'

const Button = ({ title, onPress, color, backgroundColor, width, disabled, ...rest }) => (
  <TouchableOpacity style={[styles.container, { backgroundColor: disabled ? mediumGrey : backgroundColor, width }]} disabled={disabled} onPress={onPress} {...rest}>
    <Text style={{ color }}>
      {title}
    </Text>
  </TouchableOpacity>
)

Button.defaultProps = {
  color: white,
  backgroundColor: purple,
  width: '60%',
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 4,
    minWidth: 150,
  }
})

export default Button