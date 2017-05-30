import React, { Component } from 'react';
import './App.css';
import GetFromDropbox from './GetFromDropbox.js'
import Decoder from './Decoder.js'
import PasswordsList from './PasswordsList.js'
import {Tabs, Tab} from 'react-bootstrap'

class App extends Component {
  constructor () {
    super()
    this.state = {
      passwords: [],
      encodedContent: Uint8Array.from(JSON.parse(localStorage.encodedContent || "[]"))
    }
  }

  encodedContentChange  = (newContent) => {
    this.setState({encodedContent: newContent})
    localStorage.encodedContent = JSON.stringify(Array.from(newContent))
  }

  handleOnDecoded = (decodedContent) => {
    const passwords = this.parsePasswords(decodedContent)
    this.setState({passwords})
  }

  parsePasswords (data) {
    return data.split('\n')
      .filter( (line) => { return line.trim().length > 0 })
      .map( (line) => { return line.split(':')} )
  }

  render() {
    return (
      <Tabs defaultActiveKey={1} className="App">
        <Tab eventKey={1} title="Connect" >
            {/* <GetFromDropbox onChange={this.encodedContentChange} /> */}
            <Decoder onDecoded={ (decoded) => {this.handleOnDecoded(decoded) } } encodedContent={ this.state.encodedContent }  />
        </Tab>
        <Tab title="Passwords" eventKey={2}>
          <PasswordsList passwords={ this.state.passwords } />
        </Tab>
      </Tabs>
    );
  }
}

export default App;
