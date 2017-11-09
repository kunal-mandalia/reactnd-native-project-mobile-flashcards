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
      <Button
        width='80%'
        title='Add Card'
        onPress={() => { navigation.navigate('NewQuestionView', { deck })}}
      />
      <Space />
      <Button
        width='80%'      
        title='Start Quiz'
        onPress={() => { navigation.navigate('QuizView', { deck })}}
        disabled={deck.questions.length === 0}
      />
      <Space />
      <Title size={16} text={`${deck.questions.length} ${deck.questions.length === 1 ? 'card' : 'cards'}`} />
    </CoreLayout>
  )
}

IndividualDeckView.navigationOptions = ({ navigation }) => ({ title: navigation.state.params.deck.title || 'Deck' })


export default IndividualDeckView
