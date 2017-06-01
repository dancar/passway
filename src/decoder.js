import React from 'react'
import './PasswordsList.css'
import {Button, Form, FormControl, ControlLabel} from 'react-bootstrap'
import * as openpgp from 'openpgp';
import './Decoder.css'

class Decoder extends React.Component {
  constructor () {
    super()
    this.state = {
      passcode: ""
    }
  }

  onPasscodeChange = (e) => {
    const passcode = e.target.value
    this.setState({
      passcode
    })
  }

  handleDecode = (e) => {
    e.preventDefault()
    openpgp.decrypt({
      message: openpgp.message.read(this.props.encodedContent),
      password: this.state.passcode
    }).then((plaintext) => {
      this.props.onDecoded && this.props.onDecoded(plaintext.data)
    }).catch(console.log)

  }

  getStatus = () => {
    if (!this.props.encodedContent || this.props.encodedContent.length === 0)
      return "Please load encoded content"

    if (!this.state.passcode || this.state.passcode.length === 0)
      return "Please enter Passcode"

    return "Ready to decode"
  }

  render = () => {
    const canDecode = this.state.passcode.length > 0
          && this.props.encodedContent
          && this.props.encodedContent.length > 0
    return (
      <Form className="decoder" >
        <ControlLabel>Enter Passcode:</ControlLabel>
        <FormControl id="passcode" type="password" value={ this.state.passcode } onChange={ this.onPasscodeChange } placeholder="Passcode"  />
        <br />
        <Button
          disabled={ !canDecode }
          type="submit"
          onClick={ (e) => {this.handleDecode(e) } } >
          Decode
        </Button>
        <br />
      </Form>
    )
  }
}

export default Decoder
