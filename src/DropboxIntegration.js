import React from 'react'
import { connect } from 'react-redux'
import Dropbox from 'dropbox'
import { dropboxSetAuthUrl } from './actions'

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
      clientId: CLIENT_ID,
    })
   }

  fetchData = () => {
    let accessKey = this.props.settings.dropboxAccessKey
    this.props.setStatus(STATUS_CONNECTING)
    this.dbx.setAccessToken(this.props.settings.dropboxAccessKey)
    this.dbx.filesGetTemporaryLink({path: FILE_PATH})
      .then( (response) => {
        return fetch(response.link) })
      .then( (readStream) => {
        return readStream.body.getReader().read() })
      .then( (contentContainer) => {
        const content = contentContainer.value
        console.log('DropboxIntegration.js\\ 39: content:', content);
      })
    .catch( console.error) //TODO error handling...
  }

  render = () => {
    return (
      <div />
    )
  }

  componentDidMount = () => {
    this.props.setAuthUrl(this.dbx.getAuthenticationUrl(COPY_TOKEN_PAGE))
    if (this.props.settings.dropboxOn
        && this.props.settings.dropboxAccessKey ) {
      this.fetchData()
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps !== this.props) {
      // Something has changed!
      if (nextProps.settings.needsUpload
          && nextProps.encryptedContent
          && nextProps.settings.dropboxOn
          && nextProps.settings.dropboxAccessKey) {
        this.dbx.setAccessToken(nextProps.settings.dropboxAccessKey)
        this.dbx.filesUpload({
          path: FILE_PATH,
          contents: "This is a  test" // Array.from(nextProps.encryptedContent)
        })
          .then( (response) => {
          })
          .catch( error => console.error(error))
      }
    }
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
    setStatus: status => dispatch({type: 'DROPBOX_STATUS', status})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropboxIntegration)
