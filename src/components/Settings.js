import React from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

import { dropboxSetSettings, clearCacheAndReset, setPasscode, infoMessage } from '../actions'
import { DivWithDisplayCondition } from './withDisplayCondition'
const DROPBOX_ACCESS_KEY_LENGTH = 64
class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      oldPasscode: '',
      newPasscode: '',
      dropboxAccessKey: this.props.dropboxAccessKey || ''
    }
  }

  handleDropboxOnChange (e) {
    const accessKey = e.target.value
    this.setState({
      dropboxAccessKey: accessKey
    }, () => {
      if (accessKey.lengh === 0 || this.dropboxAccessKeyIsValid()) {
        this.props.dropboxSetSettings('accessKey', this.state.dropboxAccessKey)
      }
    })
  }

  handlePasscodeChange () {
    this.setState({
      oldPasscode: '',
      newPasscode: ''
    })
    this.props.setPasscode(this.state.newPasscode)
  }

  dropboxAccessKeyIsValid () {
    return this.state.dropboxAccessKey.length === DROPBOX_ACCESS_KEY_LENGTH
  }

  validationState (source, sourceOk) {
    return source.length === 0
      ? null
      : sourceOk
        ? 'success'
        : 'error'
  }

  oldPasscodeValidationState () {
    return this.validationState(this.state.oldPasscode, this.state.oldPasscode === this.props.passcode)
  }

  newPasscodeValidationState () {
    return this.validationState(this.state.newPasscode, this.state.newPasscode.length > 1)
  }

  dropboxValidationState () {
    return this.validationState(this.state.dropboxAccessKey, this.dropboxAccessKeyIsValid())
  }

  render () {
    const oldPasscodeOk = this.state.oldPasscode === this.props.passcode
    const newPasscodeOk = oldPasscodeOk && this.state.newPasscode.length > 0
    return (
      <div>
        <h5> Dropbox </h5>
        <Checkbox
          disabled={!this.props.passcode}
          checked={!!this.props.dropboxOn}
          onChange={(e) => this.props.dropboxSetSettings('dropboxOn', e.target.checked)}
          >
          Sync to Dropbox
        </Checkbox>

        <DivWithDisplayCondition
          condition={this.props.dropboxOn}
        >
          <FormGroup
            ontrolId='dropboxAccessKey'
            validationState={this.dropboxValidationState()}
          >
            <FormControl
              type='text'
              value={this.state.dropboxAccessKey}
              onChange={this.handleDropboxOnChange.bind(this)}
              placeholder='Dropbox Access Token'
            />
            <FormControl.Feedback />
          </FormGroup>
          <div style={{textAlign: 'center'}}>
            <a target='_new' href={this.props.dropboxAuthLink} > Get Access Token </a>
          </div>
        </DivWithDisplayCondition>

        <h5> Change Passcode </h5>
        <ControlLabel>Current Passcode:</ControlLabel>
        <FormGroup controlId='currentPasscode' validationState={this.oldPasscodeValidationState()} >
          <FormControl
            disabled={!this.props.passcode}
            value={this.state.oldPasscode}
            className='passcode-input'
            onChange={e => this.setState({oldPasscode: e.target.value})}
            type='password'
            />
          <FormControl.Feedback />
        </FormGroup>

        <ControlLabel>New Passcode:</ControlLabel>
        <FormGroup controlId='newPasscode' validationState={this.newPasscodeValidationState()} >
          <FormControl
            disabled={!oldPasscodeOk}
            className='passcode-input'
            value={this.state.newPasscode}
            onChange={(e) => {
              this.setState({newPasscode: e.target.value})
            }}
            type='password'
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button
          disabled={!newPasscodeOk}
          style={{marginTop: 10}}
          onClick={() => this.handlePasscodeChange()}
        >
          Save
        </Button>

        <h5> Reset </h5>

        <Button onClick={() => window.confirm('Srsly clear cache and reset settings?') && this.props.handleReset()} >
          Clear Cache & Reset
        </Button>

        <h5 />
        <Button onClick={this.props.onBack} >
          Back
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    passcode: state.passcode,
    dropboxAuthLink: state.dropbox.authUrl,
    dropboxAccessKey: state.dropbox.settings.accessKey,
    dropboxOn: state.dropbox.settings.dropboxOn
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dropboxSetSettings: (name, value) => {
      dispatch(dropboxSetSettings(name, value))
    },
    handleReset: () => dispatch(clearCacheAndReset()),
    setPasscode: (passcode) => {
      dispatch(setPasscode(passcode))
      dispatch(infoMessage('Passcode changed successfully'))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
