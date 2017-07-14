import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Form, ControlLabel } from 'react-bootstrap'

import PasscodeInput from './PasscodeInput'
import { enterPasscode } from '../actions'

class EnterPasscode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      passcode: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state.passcode, this.props.encryptedContent)
  }

  render () {
    return (
      <Form style={{align: 'center'}} onSubmit={this.handleSubmit}>
        <PasscodeInput
          autoFocus
          onChange={(passcode) => this.setState({passcode})}
          placeholder='Passcode'
          >
          <ControlLabel>
            Please enter your passcode:
          </ControlLabel>
        </PasscodeInput>
        <div className='submit-container'>
          <Button type='submit'>Submit</Button>
        </div>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    encryptedContent: state.encryptedContent
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (newPasscode, encryptedContent) => {
      dispatch(enterPasscode(newPasscode))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EnterPasscode)
