import React from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

import { dropboxSetSettings, clearCacheAndReset, setPasscode, infoMessage } from '../actions'
import withDisplayCondition from './withDisplayCondition'
const TableWithDisplayCondition = withDisplayCondition('table')
const DROPBOX_ACCESS_KEY_LENGTH = 64
class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      oldPasscode: '',
      newPasscode: '',
      dropboxAccessKey: this.props.dropboxAccessKey || '',
      dropboxAllowSaveAccessKey: false
    }
  }

  handleDropboxOnChange (e) {
    const accessKey = e.target.value
    const allowSave = accessKey.length === DROPBOX_ACCESS_KEY_LENGTH
    this.setState({
      dropboxAccessKey: accessKey,
      dropboxAllowSaveAccessKey: allowSave
    })
  }

  handlePasscodeChange () {
    this.setState({
      oldPasscode: '',
      newPasscode: ''
    })
    this.props.setPasscode(this.state.newPasscode)
  }

  oldPasscodeValidationState () {
    return this.state.oldPasscode.length === 0
      ? null
      : this.state.oldPasscode === this.props.passcode
        ? 'success'
        : 'error'
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

        <TableWithDisplayCondition
          condition={this.props.dropboxOn}
          className='dropbox-settings-table' >
          <tbody>
            <tr>
              <td>
                <FormControl
                  type='text'
                  value={this.state.dropboxAccessKey}
                  onChange={this.handleDropboxOnChange.bind(this)}
                  placeholder='Dropbox Access Token'
                  />
              </td>
              <td style={{ textAlign: 'center' }}>
                <Button onClick={() => this.props.dropboxSetSettings('accessKey', this.state.dropboxAccessKey)}
                  disabled={!this.state.dropboxAllowSaveAccessKey}>Save </Button>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: 'center', paddingTop: '20px' }}>
                <a target='_new' href={this.props.dropboxAuthLink} > Get Access Token </a>
              </td>
            </tr>
          </tbody>
        </TableWithDisplayCondition>
        <hr />

        <h5> Change Passcode </h5>
        <ControlLabel>Current Passcode:</ControlLabel>
        <FormGroup controlId='currentPasscode' validationState={this.oldPasscodeValidationState()} >
          <FormControl
            disabled={!this.props.passcode}
            value={this.state.oldPasscode}
            onChange={e => this.setState({oldPasscode: e.target.value})}
            type='password'
            />
          <FormControl.Feedback />
        </FormGroup>

        <ControlLabel>New Passcode:</ControlLabel>
        <FormControl
          disabled={!oldPasscodeOk}
          value={this.state.newPasscode}
          onChange={(e) => {
            this.setState({newPasscode: e.target.value})
          }}
          type='password'
          />
        <Button
          disabled={!newPasscodeOk}
          style={{marginTop: 10}}
          onClick={() => this.handlePasscodeChange()}
        >
          Save
        </Button>
        <hr />

        <h5> Reset </h5>

        <Button onClick={() => window.confirm('Srsly clear cache and reset settings?') && this.props.handleReset()} >
          Clear Cache & Reset
        </Button>
        <hr />
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
      dispatch(infoMessage('Dropbox Access Token saved.'))
    },
    handleReset: () => dispatch(clearCacheAndReset()),
    setPasscode: (passcode) => {
      dispatch(setPasscode(passcode))
      dispatch(infoMessage('Passcode changed successfully'))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
