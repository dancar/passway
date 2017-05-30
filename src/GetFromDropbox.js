import React from 'react'
import './GetFromDropbox.css'
import { Button } from 'react-bootstrap';
import Dropbox from 'dropbox'

class GetFromDropbox extends React.Component {

  CLIENT_ID = 'oir8xvi101xx01y'
  FILE_PATH = '/passway.txt.gpg'

  constructor (props) {
    super()
    this.state = {
      accessToken: localStorage.dropboxAccessToken || ""
    }
    this.dbx = new Dropbox({
      clientId: this.CLIENT_ID,
    })
   }

  handleAuthClick = () => {
    const COPY_TOKEN_PAGE = 'https://www.dropbox.com/1/oauth2/display_token'
    const authUrl = this.dbx.getAuthenticationUrl(COPY_TOKEN_PAGE)
    window.open(authUrl)
  }

  fetchData = () => {
    localStorage.dropboxAccessToken = this.state.accessToken
    this.dbx.setAccessToken(this.state.accessToken)
    this.dbx.filesGetTemporaryLink({path: this.FILE_PATH})
        .then( (response) => {
          return fetch(response.link) })
        .then( (readStream) => {
          return readStream.body.getReader().read() })
        .then( (content) => {
          this.setState({content: content.value})
          this.props.onChange && this.props.onChange(this.state.content)})
        .catch( console.error)
        }
  render (props) {
    return (
      <div>
        <input type="text" placeholder="Access Token" value={ this.state.accessToken } onChange={ (e) => {this.setState({accessToken: e.target.value})}} ></input>
        <Button bsStyle="primary" onClick={ this.handleAuthClick } >Get Authentication Token </Button>
        <Button onClick={this.fetchData} >Fetch</Button>
      </div>
    )
  }
}

export default GetFromDropbox
