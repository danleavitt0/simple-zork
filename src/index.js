import element from 'vdux/element'
import reducer from './reducer'
import vdux from 'vdux/dom'
import App from './app'
import reduce from '@f/reduce'
import ready from 'domready'
import flo from 'redux-flo'
import handleSubmit from './middleware/handleSubmit'
import {out} from './actions'
import isArray from '@f/is-array'
import logger from 'redux-logger'

const defaultView = output => {
  if (typeof (output) !== 'object' || output.props) {
    return output
  } else if (isArray(output)) {
    output.join('\n')
  } else {
    return reduce((arr, item, key) => {
      arr.push(`${key}: ${item}`)
      return arr
    }, [], output).join('\n')
  }
}

const defaultOpts = {
  view: defaultView,
  initialState: {},
  middleware: [],
  welcome: ''
}

const cycleShell = (userUpdate, opts = {}) => {
  let {view, initialState, middleware, welcome} = {...defaultOpts, ...opts}

  var initState = {welcome, log: {}, user: initialState}
  const {subscribe, render} = vdux({
    reducer,
    initialState: initState,
    middleware: [logger(), flo(), handleSubmit(userUpdate), ...middleware]
  })
  ready(() => {
    subscribe(state => {
      render(<App log={state.log} view={view} user={state.user} welcome={state.welcome} />)
    })
  })
}

module.exports = cycleShell
cycleShell.out = out
