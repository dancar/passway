import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './App.css';
import ItemsList from './ItemsList.js'
import CreatePasscode from './CreatePasscode.js'
import Navbar from '../components/Navbar.js'
import {Route, Switch, Redirect} from 'react-router-dom'

class App extends Component {

  hasPasscode = () => {
    const passcode = this.props.passcode

    return passcode && passcode.length > 0
  }
  renderRedirection = () => {
    let to = this.hasPasscode() ? '/list' : '/create-passcode'
    return (
      <Redirect to={to} />
    )
  }

  render() {
    return (
      <div>
        <Navbar />
        <div  className="page-container">
          <Switch>
            <Route exact path="/list" component={ItemsList} />
            <Route exact path="/create-passcode" component={CreatePasscode} />
            <Route path="*" >
              { this.renderRedirection() }
            </Route>
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    passcode: state.passcode
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
