import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

import {setPasscodeAndDecrypt} from '../actions'

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
      <div>
        Welcome to Passway. Please enter your passcode:
        <Form onSubmit={this.handleSubmit}>
          <FormControl
            id='passcode' type='password'
            value={this.state.passcode}
            onChange={(e) => this.setState({passcode: e.target.value})}
            placeholder='Passcode' />

          <div className='submit-container'>
            <Button type='submit'>Submit</Button>
          </div>
        </Form>
      </div>
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
      dispatch(setPasscodeAndDecrypt(newPasscode))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EnterPasscode)
