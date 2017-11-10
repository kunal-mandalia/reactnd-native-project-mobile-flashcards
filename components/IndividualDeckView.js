import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CoreLayout from './Common/CoreLayout'
import Button from './Common/Button'
import Space from './Common/Space'
import Title from './Common/Title'
import { green } from '../utils/colors'

const IndividualDeckView = ({ navigation }) => {
  const { deck } = navigation.state.params
  return (
    <CoreLayout marginTop>
      <Button
        title='Add Card to Deck'
        onPress={() => { navigation.navigate('NewQuestionView', { deck })}}
      />
      <Space />
      <Button
        btnStyle='primary-inverse'
        title={`Start Quiz ${deck.questions.length > 0 ? `(${deck.questions.length})` : ''}`}
        onPress={() => { navigation.navigate('QuizView', { deck })}}
        disabled={deck.questions.length === 0}
      />
      <Space />
    </CoreLayout>
  )
}

IndividualDeckView.navigationOptions = ({ navigation }) => ({ title: navigation.state.params.deck.title || 'Deck' })


export default IndividualDeckView
