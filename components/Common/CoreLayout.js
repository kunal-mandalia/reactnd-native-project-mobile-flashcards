import React from 'react'
import { TouchableWithoutFeedback, Keyboard, StyleSheet, View } from 'react-native'

const CoreLayout = ({ children }) => {
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: 40 }]}>
        {children}
      </View>
    </TouchableWithoutFeedback>
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
