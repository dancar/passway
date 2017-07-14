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
      <div className='passcode-input-container'>
        <div>
          <div className='passcode-input-label' >
            { this.props.children }
          </div>
          <FormControl
            autoFocus={this.props.autoFocus}
            placeholder={this.props.placeholder}
            style={{
              fontSize: this.state.passcode.length > 0
                ? '2em'
                : 'inherit'
            }}
            type='password'
            value={this.state.passcode}
            onChange={this.handlePasscodeChange.bind(this)}
            className='passcode-input'
            />
        </div>
      </div>
    )
  }
}
