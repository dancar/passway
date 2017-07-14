import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'
import ItemsList from './ItemsList.js'
import CreatePasscode from './CreatePasscode.js'
import EnterPasscode from './EnterPasscode.js'
import Settings from './Settings.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSettings: false
    }
  }

  renderPasscode () {
    const hasEncryptedContent = this.props.hasEncryptedContent
    const component = hasEncryptedContent
          ? <EnterPasscode />
          : <CreatePasscode />
    return (
      <div>
        <h1> Welcome to Passway </h1>
        { component }
      </div>
    )
  }

  render () {
    const hasPasscode = this.props.passcode
    let page = this.state.showSettings
      ? <Settings onBack={() => this.setState({showSettings: false})} />
      : hasPasscode
        ? <ItemsList />
        : this.renderPasscode()

    return (
      <div>
        <div className='passway-navbar'>
          <div className='passway-brand'>
            <a onClick={() => this.setState({showSettings: false})}> Passway </a>
          </div>

          <div style={{flex: 1}} />

          <div>
            <a onClick={() => this.setState({showSettings: true})} >Settings </a>
          </div>
        </div>
        <div className={`messages message-${this.props.message.type}`}>
          &nbsp;
          { this.props.message.text }
        </div>
        <div className='page-container'>
          { page }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    passcode: state.passcode,
    hasEncryptedContent: !!state.encryptedContent
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
