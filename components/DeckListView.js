import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { white, lightGrey, darkGrey, black } from '../utils/colors'
import { connect } from 'react-redux'
import { getDecks } from '../redux/actions'

class DeckListView extends Component {
  componentDidMount () {
    const { loading, loaded, error } = this.props.status
    if (!loading && !loaded) {
      this.props.getDecks()
    }
  }
  
  render () {
    const { decks, status, navigation } = this.props
    return (
      <View style={styles.container}>
        {Object.keys(decks).map((title, i, titles) => (
          <View key={title} style={styles.card}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('IndividualDeckView', { deck: decks[title] })}
            >
              <Text style={styles.title}>{title}</Text>
              <Text>{decks[title] && decks[title].questions ? decks[title].questions.length : ' - '} cards</Text>
            </TouchableOpacity>          
          </View>
        ))}
      </View>
    )
  }
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
    borderColor: darkGrey,
    borderRadius: 4,
    borderWidth: 1,
  },
  button: {
    alignItems: 'center',    
  },
  title: {
    fontSize: 20,
  }
})

// DeckListView.defaultProps = {
//   decks: {
//     React: {
//       title: 'React',
//       questions: [
//         {
//           question: 'What is React?',
//           answer: 'A library for managing user interfaces'
//         },
//         {
//           question: 'Where do you make Ajax requests in React?',
//           answer: 'The componentDidMount lifecycle event'
//         }
//       ]
//     },
//     JavaScript: {
//       title: 'JavaScript',
//       questions: [
//         {
//           question: 'What is a closure?',
//           answer: 'The combination of a function and the lexical environment within which that function was declared.'
//         }
//       ]
//     }
//   }
// }
const mapStateToProps = (state, ownProps) => ({
  decks: state.decks,
  status: state.status,
  navigation: ownProps.navigation
})

const mapDispatchToProps = dispatch => ({
  getDecks: () => { dispatch(getDecks()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
