import React, { Component } from 'react';
import './App.css';
import GetFromDropbox from './GetFromDropbox.js'
import Decoder from './Decoder.js'
import PasswordsList from './PasswordsList.js'
import PasswayNavbar from './PasswayNavbar.js'
import {Tabs, Tab} from 'react-bootstrap'

class App extends Component {
  constructor () {
    super()
    this.state = {
      passwords: [
        {name: 'Kennedy RSA anthrax', value: 'Security Consulting Airport Anonymous Wildfire MS13 FBIS Ingram Mac-10 Egret Trump Commecen DITSA PLA'},
        {name: 'MOIS Standford MCI Whitehouse', value: '$400 million in gold bullion Gang SRI Cap-Stun Tehrik-i-Taliban Pakistan Homeland Defense Southwest Duress World News Transportation security cracking'},
        {name: 'Suicide attack Waco', value: ' Texas weapons of mass destruction halcon keyhole terrorist EO UT/RUS Attack SABC Screening IDP Trump M.P.R.I. Uzbekistan'},
        {name: 'China CDMA', value: 'clones Port Authority SAPO Cyber attack Environmental terrorist GIGN undercover Speakeasy Stranded sigvoice Bruxelles AQAP TSA'},
        {name: 'Great Item 1', value: '-890375258183733390'}
      ],
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

  handleItemDelete = (index) => {
    const newPasswords = this.state.passwords.filter((_, otherIndex) => otherIndex !== index)
    this.setState({
      passwords: newPasswords
    })
  }

  handleItemChange = (newItem, index) => {
    const newPasswords = this.state.passwords.map(function (item, otherIndex) {
      if (index === otherIndex)
        item = {
          name: newItem.name,
          value: newItem.value
        }
      return item
    })
    this.setState({passwords: newPasswords})
  }

  handleItemAdd = (newItem) => {
    this.setState({
      passwords: [newItem].concat(this.state.passwords),
    })
  }

  render() {
    return (
      <div>
        <PasswayNavbar />
        <div  className="page-container">
          <div style={{display: "none"}}>
            <GetFromDropbox onChange={this.encodedContentChange} />
            <Decoder onDecoded={ (decoded) => {this.handleOnDecoded(decoded) } } encodedContent={ this.state.encodedContent }  />
          </div>
          <PasswordsList
            onItemChange={this.handleItemChange}
            onItemDelete={this.handleItemDelete}
            onItemAdd={this.handleItemAdd}
            passwords={ this.state.passwords }
            />
          </div>
      </div>
    );
  }
}

export default App;
