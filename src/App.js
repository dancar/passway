import React, { Component } from 'react';
import './App.css';
import GetFromDropbox from './GetFromDropbox.js'
import Decoder from './Decoder.js'
import PasswordsList from './PasswordsList.js'

class App extends Component {
  constructor () {
    super()
    this.state = {
      encodedContent: "",
      passwords: []
    }
  }

  encodedContentChange  = (newContent) => {
    this.setState({encodedContent: newContent})
  }

  handleOnDecoded = (decodedContent) => {
    const passwords = this.parsePasswords(decodedContent)
    this.setState({passwords})
  }

  parsePasswords (data) {
    return data.split('\n').map( (line) => {return line.split(':')})
  }

  render() {
    return (
      <div className="App">
        <GetFromDropbox onChange={this.encodedContentChange}/>

        <hr />

        <textarea readOnly="true" value={btoa(this.state.encodedContent)} />
        <Decoder onDecoded={ (decoded) => {this.handleOnDecoded(decoded) } } encodedContent={ this.state.encodedContent }  />
        <PasswordsList passwords={ this.state.passwords } />
      </div>
    );
  }
}

export default App;
