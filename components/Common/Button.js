import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, purple } from '../../utils/colors'

const Button = ({ title, onPress, color, ...rest }) => (
  <TouchableOpacity style={styles.container} onPress={onPress} {...rest}>
    <Text style={styles.text}>
      {title}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: purple,
    padding: 20,
    borderRadius: 4,
  },
  text: {
    color: white,
  }
})

export default Button