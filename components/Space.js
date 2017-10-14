import React from 'react'
import { View } from 'react-native'

const Space = ({ size }) => {
  return (
    <View style={{ marginVertical: size || 4 }} />
  )
}

export default Space
