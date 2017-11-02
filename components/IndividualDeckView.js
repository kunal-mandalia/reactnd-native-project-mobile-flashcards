import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CoreLayout from './Common/CoreLayout'
import Button from './Common/Button'
import Space from './Common/Space'
import Title from './Common/Title'

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
        onPress={() => { navigation.navigate('QuizView', { deck })}}
      />
    </CoreLayout>
  )
}

export default IndividualDeckView
