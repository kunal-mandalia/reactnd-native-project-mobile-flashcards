import { JSDOM } from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const setup = () => {
  configure({ adapter: new Adapter() })
  const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
  const { window } = jsdom

  function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
      .filter(prop => typeof target[prop] === 'undefined')
      .map(prop => Object.getOwnPropertyDescriptor(src, prop))
    Object.defineProperties(target, props)
  }

  global.window = window
  global.document = window.document
  global.navigator = {
    userAgent: 'node.js',
  };
  copyProps(window, global)
}

const silenceConsoleError = (() => {
  const on = global.console.error
  const off = jest.fn()

  return (bool) => {
    if (bool) {
      global.console.error = off
    } else {
      global.console.error = on
    }
  }
})()

export { setup, silenceConsoleError }