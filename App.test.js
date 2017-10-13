import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON()
  console.log(rendered.props.style)
  expect(rendered).toBeTruthy();
});
