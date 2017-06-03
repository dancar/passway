import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Link, Redirect } from 'react-router-dom'
import { FormControl, Button, Glyphicon } from 'react-bootstrap'

import Item from '../components/Item'
import EditItem from '../containers/EditItem.js'
import AddItem from '../containers/AddItem.js'
import './ItemsList.css'

class ItemsList extends React.Component {
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

  renderItem = (item, index) => {
    return (
      <Item
        onItemChange={(newState) => this.props.onItemChange(newState, index)}
        key={ item.name + item.value }
        onDelete={() => this.props.onItemDelete(index)}
        index={ index }
        item={item}/>
    )
  }

  render (props) {
    if (!this.props.items)
      return (
        <Redirect to="/" />
      )
    return (
      <div>
        <Route path="/list/:index/edit" component={ EditItem } />
        <Route path="/list/add" component={ AddItem } />

        { this.props.items.length > 1  &&
          (
            <FormControl
              type="text"
              className="filter"
              value={this.state.filterText}
              placeholder="Filter"
              onChange={ e => this.setState({filterText: e.target.value}) }
              />
          )
        }

        <Link to="/list/add">
          <Button block className="items-list-add" >
            <Glyphicon glyph="plus" />
          </Button>
        </Link>

        { this.props.items.filter(this.filter).map(this.renderItem) }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps)(ItemsList)
