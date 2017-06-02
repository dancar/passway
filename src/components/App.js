import React, { Component } from 'react';
import './App.css';
import ItemsList from '../containers/ItemsList.js'
import CreatePasscode from '../containers/CreatePasscode.js'
import Navbar from './Navbar.js'
import {Route, Switch} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <div  className="page-container">
          <Switch>
            <Route exact path="/list" component={ItemsList} />
            <Route exact path="/create-passcode" component={CreatePasscode} />
            <Route path="*" >
              <div>
                404!
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
