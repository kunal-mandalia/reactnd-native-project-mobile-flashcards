import { compose, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import reducer from './reducer'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
