import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
// import { BrowserRouter as Router } from 'react-router-dom'
import { ConnectedRouter as Router, routerReducer, routerMiddleware } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';

import App from './containers/App';
import reducers from './reducers';
import './index.css';

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(combineReducers({
  ...reducers,
  router: routerReducer}), applyMiddleware(middleware))

ReactDOM.render((

  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  )
  , document.getElementById('root'));

registerServiceWorker();
