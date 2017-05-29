import React from 'react'
import * as openpgp from 'openpgp';


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

  render = () => {
    const canDecode = this.state.passcode.length > 0
          && this.props.encodedContent
          && this.props.encodedContent.length > 0
    return (
      <form>
        <input type="password" value={ this.state.passcode } onChange={ this.onPasscodeChange } placeholder="Passcode" name="passcode" />
        <input disabled={ !canDecode } type="submit" value="Decode" onClick={ (e) => {this.handleDecode(e) } } /> <br />
      </form>
    )
  }
}

export default Decoder
