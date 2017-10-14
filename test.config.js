import { JSDOM } from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/**
 * Setup required for being able to mount
 *  components as native isn't DOM based
 */
const setup = (() => {
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
})()

/**
 * As a workaround to the console errors shown
 *  when mounting components, they can be silenced with
 *  silenceConsoleError(true)
 */
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