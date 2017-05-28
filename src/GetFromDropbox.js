import React from 'react'
import './GetFromDropbox.css'
import Dropbox from 'dropbox'

class GetFromDropbox extends React.Component {

  constructor (props) {
    super()
    this.state = {
      accessToken: props.accessToken
    }
    this.dbx = new Dropbox({
      clientId: '4ogekm2terhl0gi',
    })
   }

  handleAuthClick () {
    const authUrl = this.dbx.getAuthenticationUrl(window.location.href)
    window.open(authUrl, "_self")
  }

  doFetchData () {
    this.dbx.setAccessToken(this.state.accessToken)
    this.dbx.filesGetTemporaryLink({path: '/pws.txt.gpg'})
        .then( (response) => {
          return fetch(response.link) })
        .then( (readStream) => {
          return readStream.text() })
        .then( (content) => {
          this.setState({content: content})
          this.props.onChange && this.props.onChange(this.state)})
        .catch( console.error)
        }
  render (props) {
    return (
      <div>
        <input type="text" placeholder="Access Token" value={this.state.accessToken } onChange={ (e) => {this.setState({accessToken: e.target.value})}} />
        <br />
        <button onClick={() => {this.handleAuthClick()}} >Get Authentication Token </button>
        <button onClick={() => {this.doFetchData()}} >Fetch</button>

        <hr />
        <textarea readOnly="true" value={this.state.content} />
      </div>
    )
  }
}

export default GetFromDropbox
