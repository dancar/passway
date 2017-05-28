import React from 'react'
import './GetFromDropbox.css'
import Dropbox from 'dropbox'
import qs from 'querystring'

class GetFromDropbox extends React.Component {

  constructor (props) {
    super()
    this.state = {
      accessToken: this.getAccessTokenFromLocation() || ""
    }
    this.dbx = new Dropbox({
      clientId: '4ogekm2terhl0gi',
    })
   }

  getAccessTokenFromLocation () {
    const queryString = window.location.hash.slice(1)
    const properties = qs.decode(queryString)
    return properties.access_token
  }

  handleAuthClick = () => {
    const authUrl = this.dbx.getAuthenticationUrl(window.location.href)
    window.open(authUrl, "_self")
  }

  fetchData = () => {
    this.dbx.setAccessToken(this.state.accessToken)
    this.dbx.filesGetTemporaryLink({path: '/pws.txt.gpg'})
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
        <input type="text" placeholder="Access Token" value={ this.state.accessToken } onChange={ (e) => {this.setState({accessToken: e.target.value})}} />

        <button onClick={ this.handleAuthClick } >Get Authentication Token </button>
        <button onClick={this.fetchData} >Fetch</button>
      </div>
    )
  }
}

export default GetFromDropbox
