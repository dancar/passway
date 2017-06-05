import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import Dropbox from 'dropbox'

import { setSettings, dropboxSetAuthUrl } from '../actions'

const STATUS_DISABLED = 0
const STATUS_CONNECTING = 1
const STATUS_SYNCED = 2
const COPY_TOKEN_PAGE = 'https://www.dropbox.com/1/oauth2/display_token'
const FILE_PATH = '/passway.txt.gpg'
const CLIENT_ID = 'oir8xvi101xx01y'

class DropboxIntegration extends React.Component {

  constructor (props) {
    super()
    this.dbx = new Dropbox({
      clientId: CLIENT_ID,
    })
    const authUrl = this.dbx.getAuthenticationUrl(COPY_TOKEN_PAGE)

    // TODO: find a more direct way to set this:
    props.setAuthUrl(authUrl)
   }

  fetchData = () => {
    localStorage.dropboxAccessToken = this.state.accessToken
    this.setState({status: STATUS_CONNECTING})
    this.dbx.setAccessToken(this.state.accessToken)
    this.dbx.filesGetTemporaryLink({path: FILE_PATH})
        .then( (response) => {
          return fetch(response.link) })
        .then( (readStream) => {
          return readStream.body.getReader().read() })
        .then( (content) => {
          this.setState({content: content.value})
          this.props.onChange && this.props.onChange(this.state.content)})
        .catch( console.error)
        }

  statusMessages = {
    [STATUS_DISABLED]: "Disabled",
    [STATUS_CONNECTING]: "Connecting...",
    [STATUS_SYNCED]: "synced"
  }

  render (props) {
    return (
      <div>
        { this.statusMessages[this.props.status] }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  let status = STATUS_DISABLED
  return {
    on: state.settings.dropboxAccessKey,
    status,
    accessKey: state.settings.dropboxAccessKey
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    setAuthUrl: (authUrl) => {
      dispatch(dropboxSetAuthUrl(authUrl))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DropboxIntegration))
