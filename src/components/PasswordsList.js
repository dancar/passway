import React from 'react'
import './PasswordsList.css'
import {FormControl, Button, Glyphicon} from 'react-bootstrap'
import PasswordItem from './PasswordItem'
import './PasswordsList.css'
import EditWindow from './EditWindow.js'

class PasswordsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filterText: "",
      emptyNewItem: {}
    }
  }

  filter = (item) => {
    const filterText = this.state.filterText.trim().toLowerCase()
    if (filterText.length === 0)
      return true

    return item.name.toLowerCase().indexOf(filterText) > -1
  }

  createItem = (item, index) => {
    return (
      <PasswordItem
        onItemChange={(newState) => this.props.onItemChange(newState, index)}
        key={ item.name + item.value }
        onDelete={() => this.props.onItemDelete(index)}
        item={item}/>
    )
  }

  handleFilterChange = (event) => {
    this.setState({
      filterText: event.target.value
    })
  }

  addItem = (newItem) => {
    this.setState({
      showAddWindow: false,
      emptyNewItem: {}
    })
    this.props.onItemAdd(newItem)
  }

  render (props) {
    return (
      <div>
        <FormControl
          type="text"
          className="filter"
          value={this.state.filterText}
          placeholder="Filter"
          onChange={this.handleFilterChange}
          />
        <div>
          <div>
            <Button
              block
              className="password-list-add"
              onClick={() => this.setState({showAddWindow: true})}><Glyphicon glyph="plus" /></Button>
            <EditWindow
              title="Add New Item"
              onSubmit={this.addItem}
              onHide={() => this.setState({showAddWindow: false, emptyNewItem: {}})}
              show={this.state.showAddWindow}
              item={this.state.emptyNewItem} />
          { this.props.passwords.filter(this.filter).map(this.createItem) }
          </div>
        </div>
      </div>
    )
  }

}

export default PasswordsList
