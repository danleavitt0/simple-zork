import createStore from './store'
import element from 'vdom-element'
import {listen} from 'virtual-component'
import {initializeApp} from './actions'
import vdux from 'vdux'
import App from './app'

const defaultView = (state) => state.message

module.exports = (initialState, userUpdate = () => {}, view = defaultView) => {
  const store = createStore({log: [], user: initialState}, userUpdate)

  listen(store.dispatch)
  store.dispatch(initializeApp())
  vdux(store, state => <App key='app' state={state.app} view={view} {...state} />, document.body)
}
