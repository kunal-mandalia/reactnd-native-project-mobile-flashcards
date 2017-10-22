import './utils/test.config.js'
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme'
import { View } from 'react-native'
import App from './App';
import mockStore from 'redux-mock-store'
import { initialState } from './redux/reducer'
import thunk from 'redux-thunk'
import { silenceConsoleError } from './utils/test.config'

describe(`App`, () => {
  const store = mockStore([thunk], initialState)
  const navigation = jest.fn()
  silenceConsoleError(true)
  
  it('renders without crashing', () => {
    const rendered = renderer.create(<App store={store} navigation={navigation} />).toJSON()
    expect(rendered).toBeTruthy();
  });
  
  it(`should shallow render`, () => {
    const wrapper = shallow(<App store={store} navigation={navigation} />)
    expect(wrapper).toBeDefined()
  })
})
