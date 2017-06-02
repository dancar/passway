import React, { Component } from 'react';
import './App.css';
import GetFromDropbox from './GetFromDropbox.js'
import PageContainer from '../containers/PageContainer.js'
import Navbar from './Navbar.js'

class App extends Component {
  constructor () {
    super()
    this.state = {
      items: [
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
    const items = this.parseItems(decodedContent)
    this.setState({items})
  }

  parseItems (data) {
    return data.split('\n')
      .filter( (line) => { return line.trim().length > 0 })
      .map( (line) => { return line.split(':')} )
  }

  handleItemDelete = (index) => {
    const newItems = this.state.items.filter((_, otherIndex) => otherIndex !== index)
    this.setState({
      items: newItems
    })
  }

  handleItemChange = (newItem, index) => {
    const newItems = this.state.items.map(function (item, otherIndex) {
      if (index === otherIndex)
        item = {
          name: newItem.name,
          value: newItem.value
        }
      return item
    })
    this.setState({items: newItems})
  }

  handleItemAdd = (newItem) => {
    this.setState({
      items: [newItem].concat(this.state.items),
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <div  className="page-container">
          <PageContainer />
        </div>
      </div>
    );
  }
}

export default App;
