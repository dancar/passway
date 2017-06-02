import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import PasswayApp from './reducers';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let store = createStore(PasswayApp)

ReactDOM.render( (
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
