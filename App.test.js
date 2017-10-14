import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme'
import { View } from 'react-native'
import { setup, silenceConsoleError } from './test.config.js'

describe(`App`, () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON()
    expect(rendered).toBeTruthy();
  });
  
  it(`should shallow render`, () => {
    const wrapper = shallow(<App />)
    wrapper.instance().incrementA()
    expect(wrapper).toBeDefined()
    expect(wrapper.find(View)).toHaveLength(1)
  })
  
  it(`should mount`, () => {
    silenceConsoleError(true)
    const wrapper = mount(<App />)
    wrapper.instance().incrementA()
    expect(wrapper).toBeDefined()
    expect(wrapper.state()).toBeDefined()
    silenceConsoleError(false)
  })
})
