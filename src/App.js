import React, { Component } from 'react';
import './App.css';
import qs from 'querystring'
import GetFromDropbox from './GetFromDropbox.js'
class App extends Component {
  constructor () {
    super()
    this.dropboxAccessToken = this.getDropboxAccessTokenFromUrl()
  }

  getDropboxAccessTokenFromUrl () {
    const queryString = window.location.hash.slice(1)
    const properties = qs.decode(queryString)
    return properties.access_token
  }

  dropboxContentChange (dropboxState) {
    const encodedContent = dropboxState.content
  }

  render() {
    return (
      <div className="App">
        <GetFromDropbox accessToken={this.dropboxAccessToken} onChange={this.dropboxContentChange}/>
      </div>
    );
  }
}

export default App;
