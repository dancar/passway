import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import * as crypto from './crypto'
import dropboxMiddleware from './middleware/dropbox'
import App from './components/App'
import rootReducer from './reducers'
import { initMiddleware } from './actions'

const logger = createLogger({
  collapsed: true,
  level: 'debug'
})

const store = createStore(rootReducer, applyMiddleware(dropboxMiddleware, thunk, logger))

store.dispatch(initMiddleware())
crypto.subscribeToStore(store)

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
  )
  , document.getElementById('root'))
registerServiceWorker()
