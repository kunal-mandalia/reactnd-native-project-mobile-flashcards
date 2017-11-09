import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { white, lightGrey, black, purple } from '../../utils/colors'

const InputText = (props) => (
  <TextInput
    style={styles.control}
    {...props}
  />
)

const styles = StyleSheet.create({
  control: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: purple,
    borderRadius: 26,
    padding: 14,
    width: '80%',
    marginVertical: 6,
  }
})

export default InputText
