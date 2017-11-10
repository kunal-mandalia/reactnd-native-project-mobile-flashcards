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
    borderColor: lightGrey,
    borderRadius: 25,
    padding: 14,
    width: '100%',
    marginVertical: 4,
  }
})

export default InputText
