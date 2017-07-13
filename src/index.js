import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import * as crypto from './crypto'
import dropboxMiddleware from './middleware/dropbox'
import App from './components/App'
import reducers from './reducers'
import { initMiddleware } from './actions'
import './index.css'

const logger = createLogger({
  collapsed: true,
  level: 'debug'
})

const store = createStore(combineReducers({
  ...reducers
}), applyMiddleware(dropboxMiddleware, thunk, logger))

store.dispatch(initMiddleware())
crypto.subscribeToStore(store)

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
  )
  , document.getElementById('root'))
registerServiceWorker()
