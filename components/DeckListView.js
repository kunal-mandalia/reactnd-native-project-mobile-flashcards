import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, lightGrey, darkGrey, black } from '../utils/colors'

const DeckListView = ({ navigation, decks }) => {
  return (
    <View style={styles.container}>
      {Object.keys(decks).map((title, i, titles) => (
        <View key={title} style={styles.card}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('IndividualDeckView', { deck: decks[title] })}
          >
            <Text style={styles.title}>{title}</Text>
            <Text>{titles.length} cards</Text>
          </TouchableOpacity>          
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    marginTop: 6,
    marginLeft: 8,
    marginRight: 8,
    borderColor: darkGrey,
    borderRadius: 4,
    borderWidth: 2,
  },
  button: {
    alignItems: 'center',    
  },
  title: {
    fontSize: 20,
  }
})

DeckListView.defaultProps = {
  decks: {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
}

export default DeckListView
