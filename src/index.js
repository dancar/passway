import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import App from './containers/App';
import Reducers from './reducers';
import './index.css';

const store = createStore(Reducers)

ReactDOM.render((

  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  )
  , document.getElementById('root'));

registerServiceWorker();
