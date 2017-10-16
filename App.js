import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'

import DeckListView from './components/DeckListView'
import IndividualDeckView from './components/IndividualDeckView'
import QuizView from './components/QuizView'
import NewQuestionView from './components/NewQuestionView'
import NewDeckView from './components/NewDeckView'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { white, purple } from './utils/colors'

import { Provider } from 'react-redux'
import store from './redux/store'

const Tabs = TabNavigator({
  DeckListView: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home-outline' size={30} color={tintColor} />
    },
  },
  NewDeckView: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />,
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
})

const Stack = StackNavigator({
  Home: {
    screen: Tabs,
  },
  IndividualDeckView: {
    screen: IndividualDeckView
  },
  QuizView: {
    screen: QuizView,
  },
  NewQuestionView: {
    screen: NewQuestionView
  }
})

export default class App extends React.Component {
  constructor () {
    super()
    this.state = { a: 1, b: 9 }
    this.incrementA = this.incrementA.bind(this)
  }

  incrementA () { 
    this.setState(state => ({ a: state.a + 1 }))
  }

  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
