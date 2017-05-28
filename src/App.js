import React, { Component } from 'react';
import './App.css';
import GetFromDropbox from './GetFromDropbox.js'
import Decoder from './decoder.js'
class App extends Component {
  constructor () {
    super()
    this.state = { encodedContent: "" }
  }

  encodedContentChange  = (newContent) => {
    this.setState({encodedContent: newContent})
  }

  handleOnDecoded = (decodedContent) => {
    this.setState({decodedContent})
  }

  render() {
    return (
      <div className="App">
        <GetFromDropbox onChange={this.encodedContentChange}/>

        <hr />

        <textarea readOnly="true" value={btoa(this.state.encodedContent)} />
        <Decoder onDecoded={ (decoded) => {this.handleOnDecoded(decoded) } } encodedContent={ this.state.encodedContent } decodedContent={ this.state.decodedContent } />
      </div>
    );
  }
}

export default App;
