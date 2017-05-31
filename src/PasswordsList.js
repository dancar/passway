import React from 'react'
import './PasswordsList.css'
import {PanelGroup, FormControl} from 'react-bootstrap'
import PasswordItem from './PasswordItem'
class PasswordsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filterText: ""
    }
  }

  filter = (item) => {
    const filterText = this.state.filterText.trim().toLowerCase()
    if (filterText.length === 0)
      return true

    return item.name.toLowerCase().indexOf(filterText) > -1
  }

  createItem (item, index) {
    return (
      <PasswordItem index={index} key={ item.name + item.value } item={item}/>
    )
  }

  handleFilterChange = (event) => {
    this.setState({
      filterText: event.target.value
    })
  }

  render (props) {
    return (
      <div>
        <FormControl
          type="text"
          value={this.state.filterText}
          placeholder="Filter"
          onChange={this.handleFilterChange}
          />
        <PanelGroup defaultActiveKey="1" >
          { this.props.passwords.filter(this.filter).map(this.createItem) }
        </PanelGroup>
      </div>
    )
  }

}

export default PasswordsList
