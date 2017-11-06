import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, purple } from '../../utils/colors'

const Button = ({ title, onPress, color, width, ...rest }) => (
  <TouchableOpacity style={[styles.container, { width: width }]} onPress={onPress} {...rest}>
    <Text style={styles.text}>
      {title}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: purple,
    padding: 20,
    borderRadius: 4,
    minWidth: 200,
  },
  text: {
    color: white,
  }
})

export default Button