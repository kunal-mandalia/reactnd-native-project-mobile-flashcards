import React from 'react'
import { Text } from 'react-native'

const Title = ({ text, size, ...rest }) => (
  <Text style={{ fontSize: size || 32, marginTop: 12, marginBottom: 24, textAlign: 'center', ...rest }}>{text}</Text>
)

export default Title
