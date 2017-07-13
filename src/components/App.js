import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'
import ItemsList from './ItemsList.js'
import CreatePasscode from './CreatePasscode.js'
import EnterPasscode from './EnterPasscode.js'
import Settings from './Settings.js'
import { DivWithDisplayCondition } from './withDisplayCondition'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSettings: false
    }
  }

  render () {
    const hasPasscode = this.props.passcode
    const hasEncryptedContent = this.props.hasEncryptedContent
    let page

    if (hasPasscode) {
      page = this.state.showSettings
        ? <Settings />
        : <ItemsList />
    } else {
      page = hasEncryptedContent
        ? <EnterPasscode />
        : <CreatePasscode />
    }

    return (
      <div>
        <div className='passway-navbar'>
          <div className='passway-brand'>
            <a href='javascript: void(0)' onClick={() => this.setState({showSettings: false})}> Passway </a>
          </div>
          <DivWithDisplayCondition condition={hasPasscode} className='passway-navbar-right'>
            <a href='javascript: void(0)' onClick={() => this.setState({showSettings: true})} >Settings </a>
          </DivWithDisplayCondition>
        </div>
        { page }
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
