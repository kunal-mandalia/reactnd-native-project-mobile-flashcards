import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CoreLayout from './CoreLayout'
import Button from './Button'
import Space from './Space'
import Title from './Title'

const IndividualDeckView = ({ navigation }) => {
  const { deck } = navigation.state.params
  return (
    <CoreLayout marginTop>
      <Title text={deck.title} />
      <Button
        title='Add Card'
        onPress={() => { navigation.navigate('NewQuestionView', { deckTitle: deck.title })}}
      />
      <Space />
      <Button
        title='Start Quiz'
        onPress={() => { navigation.navigate('QuizView', { deckTitle: deck.title })}}
      />
    </CoreLayout>
  )
}

export default IndividualDeckView
