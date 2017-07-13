import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Form, FormControl, ControlLabel } from 'react-bootstrap'

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

  handlePasscodeChange (e) {
    this.setState({passcode: e.target.value})
  }

  handlePasscode2Change (e) {
    this.setState({passcode2: e.target.value})
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
          <FormControl
            id='passcode' type='password'
            value={this.state.passcode}
            onChange={this.handlePasscodeChange.bind(this)}
            placeholder='Passcode' />

          { this.passcodeOk() &&

            <div>
              <ControlLabel>Repeat Passcode:</ControlLabel>
              <FormControl
                id='passcode2' type='password'
                value={this.state.passcode2}
                onChange={this.handlePasscode2Change.bind(this)}
                placeholder='Repeat Passcode' />
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
