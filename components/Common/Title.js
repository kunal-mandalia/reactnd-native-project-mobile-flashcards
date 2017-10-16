import React from 'react'
import { Text } from 'react-native'

const Title = ({ text, size }) => (
  <Text style={{ fontSize: size || 32, marginTop: 12, marginBottom: 24 }}>{text}</Text>
)

export default Title
