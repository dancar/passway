import React from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, FormControl } from 'react-bootstrap'

import { dropboxSetSettings } from '../actions'
const DROPBOX_ACCESS_KEY_LENGTH = 64
class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dropboxOn: this.props.dropboxOn,
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

  render () {
    return (
      <div>
        <h4> Settings </h4>
        <Checkbox
          checked={!!this.props.dropboxOn}
          onChange={(e) => this.props.dropboxSetSettings('dropboxOn', e.target.checked)}
          >Sync to Dropbox </Checkbox>
        { this.props.dropboxOn && (
          <table style={{width: '100%', margin: 'auto', background: 'none'}}>
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
                  <Button onClick={() => this.props.dropboxSetSettings('accessKey',this.state.dropboxAccessKey)}
                    disabled={!this.state.dropboxAllowSaveAccessKey}>Save </Button>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: 'center', paddingTop: '20px' }}>
                  <a target='_new' href={this.props.dropboxAuthLink} > Get Access Token </a>
                </td>
              </tr>
            </tbody>
          </table>
        )
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    dropboxAuthLink: state.dropbox.authUrl,
    dropboxAccessKey: state.dropbox.settings.accessKey,
    dropboxOn: state.dropbox.settings.dropboxOn
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dropboxSetSettings: (name, value) => {
      dispatch(dropboxSetSettings(name, value))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
