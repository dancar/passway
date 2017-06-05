import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Form, FormGroup, InputGroup, Button, Checkbox, FormControl} from 'react-bootstrap'

import {setSettings} from '../actions'
const DROPBOX_ACCSES_KEY_LENGTH = 64
class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dropboxOn: this.props.dropboxOn,
      dropboxAccessKey: this.props.dropboxAccessKey || "",
      dropboxAllowSaveAccessKey: false,
    }
  }

  handleDropboxOnChange = (e) => {
    const accessKey = e.target.value
    const allowSave = accessKey.length === DROPBOX_ACCSES_KEY_LENGTH
    this.setState({
      dropboxAccessKey: accessKey,
      dropboxAllowSaveAccessKey: allowSave
    })
  }

  render = () => {
    return (
      <div>
        <h4> Settings </h4>
          <Checkbox
            checked={ !!this.props.dropboxOn }
            onChange={ (e) => this.props.setSettings({dropboxOn: e.target.checked}) }
            >Sync to Dropbox </Checkbox>
          { this.props.dropboxOn && (
            <table style={ {width: '100%', margin: 'auto', background: 'none'} }>
              <tbody>
              <tr>
                <td>
                <FormControl
                  type="text"
                  value={ this.state.dropboxAccessKey }
                  onChange={ this.handleDropboxOnChange }
                  placeholder="Dropbox Acces Token"
                  />
                </td>
                <td style={ {textAlign: "center" } }>
                  <Button onClick={ () => this.props.setSettings({dropboxAccessKey: this.state.dropboxAccessKey }) }
                    disabled={ !this.state.dropboxAllowSaveAccessKey }>Save </Button>
                  </td>
              </tr>
              <tr>
                <td style={ { paddingTop: '20px' } }>
                  <a target="_new" href={ this.props.dropboxAuthLink } > Get Access Key </a>
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
    settings: state.settings,
    dropboxAuthLink: state.dropbox.authUrl,
    dropboxAccessKey: state.settings.dropboxAccessKey,
    dropboxOn: state.settings.dropboxOn
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSettings: (settings) => {
      dispatch(setSettings(settings))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
