import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter,  routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import Reducers from './reducers';
import './index.css';

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(Reducers, applyMiddleware(middleware))

ReactDOM.render((

  <Provider store={store}>
    <ConnectedRouter history={history} >
      <App /W>
    </ConnectedRouter>
  </Provider>
  )
  , document.getElementById('root'));

registerServiceWorker();
