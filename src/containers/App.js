import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

import './App.css'
import ItemsList from '../containers/ItemsList.js'
import CreatePasscode from './CreatePasscode.js'
import EnterPasscode from './EnterPasscode.js'
import Navbar from '../components/Navbar.js'
import Settings from './Settings.js'
import DropboxIntegration from '../DropboxIntegration.js' // TODO relocate file

class App extends Component {
  renderRedirection () {
    const hasPasscode = this.props.passcode
    const hasEncryptedContent = this.props.hasEncryptedContent

    let to = '/list'
    if (!hasPasscode) {
      to = hasEncryptedContent ? '/enter-passcode' : '/create-passcode'
    }

    return (
      <Redirect to={to} />
    )
  }

  render () {
    return (
      <div>
        {
          <DropboxIntegration />
        }
        <Navbar />
        <div className='page-container'>
          <Switch>
            <Route path='/settings' component={Settings} />
            <Route path='/list' component={ItemsList} />
            <Route exact path='/create-passcode' component={CreatePasscode} />
            <Route exact path='/enter-passcode' component={EnterPasscode} />
            <Route path='*' >
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
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
