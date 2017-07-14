import React from 'react'
import { FormControl } from 'react-bootstrap'

export default class PasscodeInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      passcode: ''
    }
  }

  handlePasscodeChange (e) {
    const passcode = e.target.value
    this.setState({passcode})
    this.props.onChange(passcode)
  }

  render () {
    return (
      <FormControl
        {...this.props}
        style={{
          fontSize: this.state.passcode.length > 0
            ? '2em'
            : 'inherit'
        }}
        type='password'
        value={this.state.passcode}
        onChange={this.handlePasscodeChange.bind(this)}
        placeholder='Passcode'
        className='passcode-input'
      />
    )
  }
}