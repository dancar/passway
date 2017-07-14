import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Form, ControlLabel } from 'react-bootstrap'

import PasscodeInput from './PasscodeInput'
import { createPasscode } from '../actions'
import './CreatePasscode.css'

class CreatePasscode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      passcode: '',
      passcode2: ''
    }
  }

  handlePasscodeChange (passcode) {
    this.setState({passcode})
  }

  handlePasscode2Change (passcode2) {
    this.setState({passcode2})
  }

  passcodeOk () {
    return (this.state.passcode || '').length > 0 // TODO SOMETHING
  }

  passcode2Ok () {
    return this.passcodeOk() && this.state.passcode === this.state.passcode2
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state.passcode)
  }

  render (props) {
    return (
      <div>
        Welcome to Passway. Please choose your passcode:
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <ControlLabel>Enter Passcode:</ControlLabel>
          <PasscodeInput
            autoFocus
            onChange={this.handlePasscodeChange.bind(this)}
            placeholder='Passcode'
          />

          { this.passcodeOk() &&

            <div>
              <ControlLabel>Repeat Passcode:</ControlLabel>
              <PasscodeInput
                onChange={this.handlePasscode2Change.bind(this)}
                placeholder='Repeat Passcode'
              />
            </div>
              }

          { this.passcode2Ok() &&
          <div className='submit-container'>
            <Button type='submit'>Submit</Button>
          </div>
                }
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (newPasscode) => {
      dispatch(createPasscode(newPasscode))
    }
  }
}

export default connect(null, mapDispatchToProps)(CreatePasscode)
