import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { AppLoading } from 'expo'
import { white, lightGrey, darkGrey, black } from '../utils/colors'
import { connect } from 'react-redux'
import { getDecks } from '../redux/actions'

class DeckListView extends Component {
  static navigationOptions = ({ navigation }) => ({ title: 'All Decks' })

  componentDidMount () {
    const { loading, loaded, error } = this.props.status
    if (!loading && !loaded) {
      this.props.getDecks()
    }
  }

  _keyExtractor = (item, index) => {
    return item.title
  }

  _renderItem = ({ item }) => (
    <View key={item.title} style={styles.card}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.navigation.navigate('IndividualDeckView', { deck: item })}
      >
        <Text style={styles.title}>{item.title}</Text>
        {<Text style={styles.subtitle}>{item.questions ? item.questions.length : '0'} cards</Text>}
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
        {status.loaded ? (
          <FlatList
            data={decksArray}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={this._renderSeparator}
          />
        ) : (
          <AppLoading />
        )}
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
  getDecks: () => { dispatch(getDecks()) }
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
