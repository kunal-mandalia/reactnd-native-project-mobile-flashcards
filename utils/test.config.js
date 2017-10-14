import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/**
 * Setup required for shallow rendering
 */
const setup = (() => {
  configure({ adapter: new Adapter() })
})()

/**
 * Helper to mute console errors
 *  e.g. silenceConsoleError(true) mutes them
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
export default setup