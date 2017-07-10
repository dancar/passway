/* globals fetch */

import React from 'react'
import { connect } from 'react-redux'
import Dropbox from 'dropbox'

import { dropboxSetAuthUrl, mergeItems } from './actions'
import * as crypto from './crypto.js'

export const STATUS_DISABLED = 0
export const STATUS_CONNECTING = 1
export const STATUS_SYNCED = 2

const COPY_TOKEN_PAGE = 'https://www.dropbox.com/1/oauth2/display_token'
const FILE_PATH = '/passway.txt.gpg'
const CLIENT_ID = 'oir8xvi101xx01y'

class DropboxIntegration extends React.Component {
  constructor (props) {
    super()
    this.dbx = new Dropbox({
      clientId: CLIENT_ID
    })
  }

  async fetchData () {
    if (!this.props.passcode || !this.props.settings.dropboxAccessKey) {
      return
    }
    this.props.setStatus(STATUS_CONNECTING)
    this.dbx.setAccessToken(this.props.settings.dropboxAccessKey)
    // TODO: handle first sync when there's no file yet
    const link = await this.dbx.filesGetTemporaryLink({path: FILE_PATH})
    if (this.rev === link.rev) {
      // This file has already been downloaded
      return
    }
    this.rev = null
    const response = await fetch(link.link)
    this.rev = link.metadata.rev
    const contentType = response.headers.get('content-type')
    let content
    if (contentType.match(/text/)) {
      content = await response.text()
    } else {
      const contentArrayBuffer = await response.arrayBuffer()
      content = new Uint8Array(contentArrayBuffer)
    }
    try {
      const newItems = await crypto.decrypt(content, this.props.passcode)
      this.props.handleNewItems(newItems)
    } catch (e) {
      console.error('Failed decrypting dropbox content')
    }
  }

  render () {
    return null
  }

  componentDidMount () {
    this.props.setAuthUrl(this.dbx.getAuthenticationUrl(COPY_TOKEN_PAGE))
    if (this.props.settings.dropboxOn &&
        this.props.settings.dropboxAccessKey) {
      this.fetchData()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props && // Something has changed!
        nextProps.settings.needsUpload &&
        nextProps.encryptedContent &&
        nextProps.settings.dropboxOn &&
        nextProps.settings.dropboxAccessKey) {
      this.upload(nextProps)
    }
    this.fetchData()
  }

  upload (props) {
    this.dbx.setAccessToken(props.settings.dropboxAccessKey)
    this.dbx.filesUpload({
      path: FILE_PATH,
      autorename: false,
      mode: this.rev ? { '.tag': 'update', update: this.rev } : {'.tag': 'add'},
      contents: props.encryptedContent
    })
      .then((response) => {
        console.log('UPLOAD SUCCESS')
        // TODO SOMETHING
      })
      .catch(error => {
        if (error.status === 409) {
          this.fetchData()
          console.log('Update rejected for rev ' + this.rev)
        } else {
          console.error('Dropbox upload error', error)
        }
      })
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.dropbox,
    encryptedContent: state.encryptedContent,
    passcode: state.passcode
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setAuthUrl: authUrl => dispatch(dropboxSetAuthUrl(authUrl)),
    setStatus: status => dispatch({type: 'DROPBOX_STATUS', status}), // TODO: action?
    handleNewItems: (newItems, timestamp) => dispatch(mergeItems(newItems, timestamp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropboxIntegration)
