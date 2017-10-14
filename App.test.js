import './utils/test.config.js'
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme'
import { View } from 'react-native'
import App from './App';

describe(`App`, () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON()
    expect(rendered).toBeTruthy();
  });
  
  it(`should shallow render`, () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toBeDefined()
  })
})
