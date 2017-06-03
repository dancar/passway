import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './App.css';
import ItemsList from '../containers/ItemsList.js'
import CreatePasscode from './CreatePasscode.js'
import Navbar from '../components/Navbar.js'
import {Route, Switch, Redirect} from 'react-router-dom'

class App extends Component {

  renderRedirection = () => {
    const hasPasscode = this.props.passcode,
          hasItems = this.props.hasItems,
          hasEncryptedContent = this.hasEncryptedContent

    let to = '/list'
    if (!hasPasscode)
      to = hasEncryptedContent ? '/enter-passcode' : '/create-passcode'

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
            <Route path="/list" component={ItemsList} />
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
    passcode: state.passcode,
    hasItems: !!state.items,
    hasEncryptedContent: !!state.encryptedContent
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
