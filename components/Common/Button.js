import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, purple } from '../../utils/colors'

const Button = ({ title, onPress, color, backgroundColor, width, ...rest }) => (
  <TouchableOpacity style={[styles.container, { backgroundColor, width }]} onPress={onPress} {...rest}>
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