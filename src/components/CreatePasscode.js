import React, {Component} from 'react'
import {Button, Form, FormControl, ControlLabel} from 'react-bootstrap'
import './CreatePasscode.css'
export default class CreatePassword extends Component {

  constructor (props) {
    super(props)
    this.state = {
      passcode: ""
    }
  }

  handlePasscodeChange = (e) => {
    this.setState({passcode: e.target.value})
  }

  handlePasscode2Change = (e) => {
    this.setState({passcode2: e.target.value})
  }

  passcodeOk = () => {
    return (this.state.passcode || "").length > 8
  }

  passcode2Ok = () => {
    return this.passcodeOk() && this.state.passcode === this.state.passcode2
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.passcode)
  }


  render = (props) => {
    return (
      <div>
        Welcome to Passway. Please choose your passcode:
        <Form onSubmit={this.handleSubmit}>
          <ControlLabel>Enter Passcode:</ControlLabel>
          <FormControl
            id="passcode" type="password"
            value={ this.state.passcode }
            onChange={ this.handlePasscodeChange }
            placeholder="Passcode"  />

          { this.passcodeOk() &&

            <div>
            <ControlLabel>Repeat Passcode:</ControlLabel>
              <FormControl
                  id="passcode2" type="password"
                  value={ this.state.passcode2 }
                  onChange={ this.handlePasscode2Change }
                  placeholder="Repeat Passcode"  />
                </div>
              }

              { this.passcode2Ok() &&
                <div className="submit-container">
                    <Button type="submit">Submit</Button>
                  </div>
                }
        </Form>
      </div>
    )

  }
}
