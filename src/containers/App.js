import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

import './App.css'
import ItemsList from '../containers/ItemsList.js'
import CreatePasscode from './CreatePasscode.js'
import EnterPasscode from './EnterPasscode.js'
import Navbar from '../components/Navbar.js'
import Settings from './Settings.js'

class App extends Component {
  render () {
    const hasPasscode = this.props.passcode
    const hasEncryptedContent = this.props.hasEncryptedContent

    if (!hasPasscode) {
      return hasEncryptedContent
        ? <EnterPasscode />
        : <CreatePasscode />
    }

    return (
      <div>
        <Navbar />
        <div className='page-container'>
          <Switch>
            <Route path='/settings' component={Settings} exact />
            <Route path='/' component={ItemsList} exact />
            <Route path='*' >
              <Redirect to='/' push />
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
    hasEncryptedContent: !!state.encryptedContent
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
