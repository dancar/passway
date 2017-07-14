import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Form, ControlLabel } from 'react-bootstrap'

import PasscodeInput from './PasscodeInput'
import { createPasscode } from '../actions'
import './CreatePasscode.css'
import { DivWithDisplayCondition } from './withDisplayCondition'

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
      <div className='align-center'>
        Welcome to Passway! <br />
        Please choose a passcode to be used for data encryption.
        <Form onSubmit={this.handleSubmit.bind(this)} >
          <div className='create-passcode-input-container'>
            <ControlLabel>Enter a Passcode:</ControlLabel>
            <PasscodeInput
              autoFocus
              placeholder='Passcode'
              onChange={(passcode) => { this.setState({passcode}) }}
            />
          </div>

          <DivWithDisplayCondition
            condition={this.passcodeOk()}
            className='create-passcode-input-container'
          >
            <ControlLabel>Repeat Passcode:</ControlLabel>
            <PasscodeInput
              onChange={passcode2 => this.setState({passcode2})}
              placeholder='Repeat Passcode'
            />
          </DivWithDisplayCondition>

          <DivWithDisplayCondition
            condition={this.passcode2Ok()}
            className='submit-container'
          >
            <Button type='submit'>Initialize</Button>
          </DivWithDisplayCondition>
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
