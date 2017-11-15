import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { AppLoading } from 'expo'
import { white, lightGrey, darkGrey, black } from '../utils/colors'
import { connect } from 'react-redux'
import { getDecks } from '../redux/actions'
import { setLocalNotification } from '../redux/actions'
import { Button, Title, Space } from './Common'
import { pluralise } from '../utils/helper'

export const EmptyList = ({ navigation }) => (
  <View style={styles.emptyList}>
    <Title
      text='Create a new flashcard deck to get started'
      size={18}
      marginHorizontal='8%'
    />
    <Space />
    <Button
      btnStyle='primary'
      width='80%'
      onPress={() => {navigation.navigate('NewDeckView') }}
      title='Add Deck' />
  </View>
)

class DeckListView extends Component {
  static navigationOptions = ({ navigation }) => ({ title: 'All Decks' })

  componentDidMount () {
    const { loading, loaded, error } = this.props.status
    if (!loading && !loaded) {
      this.props.getDecks()
    }
    this.props.setLocalNotification()
  }

  _keyExtractor = (item, index) => {
    return item.title
  }

  _renderItem = ({ item }) => (
    <View key={item.title} style={styles.card}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.navigation.navigate('IndividualDeckView', { deckTitle: item.title })}
      >
        <Text style={styles.title}>{item.title}</Text>
        {<Text style={styles.subtitle}>{item.questions.length} {pluralise(item.questions.length, 'card')}</Text>}
      </TouchableOpacity>
    </View>
  )

  _renderSeparator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: '#CED0CE',
      }}
    />
  )
  
  render () {
    const { decks, status, navigation } = this.props
    const decksArray = Object.keys(decks).map(k => decks[k])
    return (
      <View>
        {status.loaded
          ? (
            decksArray.length > 0
            ? <FlatList
                data={decksArray}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={this._renderSeparator}
              />
            : <EmptyList navigation={navigation} />
          )
          : <AppLoading />
        }
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  decks: state.decks,
  status: state.status,
  navigation: ownProps.navigation
})

const mapDispatchToProps = dispatch => ({
  getDecks: () => { dispatch(getDecks()) },
  setLocalNotification: () => { dispatch(setLocalNotification()) },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    color: darkGrey,
  },
  emptyList: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
