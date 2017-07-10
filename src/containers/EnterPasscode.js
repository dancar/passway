import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Form, FormControl, ControlLabel } from 'react-bootstrap'
import { push } from 'react-router-redux'

import * as crypto from '../crypto.js'
import {setPasscode, mergeItems} from '../actions'

class EnterPasscode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      passcode: ""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.passcode, this.props.encryptedContent)
  }

  render = () => {
    return (
      <div>
        Welcome to Passway. Please enter your passcode:
        <Form onSubmit={this.handleSubmit}>
          <FormControl
            id="passcode" type="password"
            value={ this.state.passcode }
            onChange={ (e) => this.setState({passcode: e.target.value}) }
            placeholder="Passcode"  />

          <div className="submit-container">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    encryptedContent: state.encryptedContent,
    encryptedContentTimestamp: state.encryptedContentTimestamp
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (newPasscode, encryptedContent) => {
      // TOOD SHouldn't be here?
      crypto.decrypt(encryptedContent, newPasscode)
        .then( (decryptedContent) => {
          dispatch(mergeItems(decryptedContent))
          dispatch(push('/'))
        })
      dispatch(setPasscode(newPasscode))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EnterPasscode)
