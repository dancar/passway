import React from 'react'
import { connect } from 'react-redux'
import {FormControl, Button, Glyphicon} from 'react-bootstrap'

import {addItem, changeItem, deleteItem} from '../actions'
import Item from '../components/Item'
import EditWindow from '../components/EditWindow.js'
import './ItemsList.css'

class ItemsList extends React.Component {
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
      <Item
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
          style={{display: this.props.items.length > 0 ? "block" : "none"}}
          />
        <div>
          <div>
            <Button
              block
              className="items-list-add"
              onClick={() => this.setState({showAddWindow: true})}><Glyphicon glyph="plus" /></Button>
            <EditWindow
              title="Add New Item"
              onSubmit={this.addItem}
              onHide={() => this.setState({showAddWindow: false, emptyNewItem: {}})}
              show={this.state.showAddWindow}
              item={this.state.emptyNewItem} />
          { this.props.items.filter(this.filter).map(this.createItem) }
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemAdd: (newItem) => {
      dispatch(addItem(newItem))
    },

    onItemChange: (item, index) => {
      dispatch(changeItem(item, index))
    },

    onItemDelete: (index) => {
      dispatch(deleteItem(index))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemsList)
