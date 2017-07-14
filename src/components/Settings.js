import React from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, FormControl } from 'react-bootstrap'

import { dropboxSetSettings, clearCacheAndReset } from '../actions'
import withDisplayCondition from './withDisplayCondition'
const TableWithDisplayCondition = withDisplayCondition('table')
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
        <h5> Dropbox </h5>
        <Checkbox
          checked={!!this.props.dropboxOn}
          onChange={(e) => this.props.dropboxSetSettings('dropboxOn', e.target.checked)}
          >Sync to Dropbox </Checkbox>
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
    handleReset: () => dispatch(clearCacheAndReset())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
