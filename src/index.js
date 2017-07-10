import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router, routerReducer, routerMiddleware } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import * as crypto from './crypto'
import App from './containers/App'
import reducers from './reducers'
import './index.css'

const history = createHistory()
const store = createStore(combineReducers({
  ...reducers,
  router: routerReducer
}), applyMiddleware(thunk, routerMiddleware(history), logger))
crypto.subscribeToStore(store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  )
  , document.getElementById('root'))
registerServiceWorker()
