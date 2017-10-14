import React from 'react'
import { View, StyleSheet } from 'react-native'

const CoreLayout = ({ children, marginTop }) => {
  const mt = marginTop ? 40 : 0
  return (
    <View style={[styles.container, { marginTop: mt }]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  }
})

export default CoreLayout
