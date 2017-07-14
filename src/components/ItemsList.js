import React from 'react'
import { connect } from 'react-redux'
import { FormControl, InputGroup, Button, Glyphicon } from 'react-bootstrap'

import { addItem } from '../actions'
import Item from './Item'
import AddItem from './AddItem'
import './ItemsList.css'
import withDisplayCondition from './withDisplayCondition'

const InputGroupWithDisplayCondition = withDisplayCondition(InputGroup)
const FILTER_THROTTLING_TIME = 50

class ItemsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expandedItemIndex: null,
      showAdd: false,
      selected: null,
      requestedFilterText: '',
      filterText: ''
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }

  filterFn (item) {
    const filterText = this.state.filterText
    return new RegExp(filterText.split('').join('.*'), 'i').test(item.name)
  }

  handleAddItem (item) {
    this.setState({showAdd: false})
    this.props.addItem(item)
  }

  handleExpandClick (index) {
    const expandedItemIndex = this.state.expandedItemIndex === index ? null : index
    this.setState({expandedItemIndex})
  }

  setFilterText (filterText) {
    // Throttling
    this.setState({requestedFilterText: filterText})
    if (this.lastFilterTimeout) {
      clearTimeout(this.lastFilterTimeout)
    }
    this.lastFilterTimeout = setTimeout(() => this.setState({filterText}), FILTER_THROTTLING_TIME)
  }

  renderItems () {
    if (this.props.items.length === 0) {
      return (
        <div className='no-items'>
          No items found.<br />
          Click "+" above to add some items
        </div>
      )
    }
    return this.props.items.map((item, index) => {
      if (!this.filterFn(item)) {
        return false
      }
      return (
        <Item
          onItemChange={(newState) => this.props.onItemChange(newState, index)}
          key={item.name + item.value}
          onDelete={() => this.props.onItemDelete(index)}
          index={index}
          expanded={this.state.expandedItemIndex === index}
          onExpandClick={this.handleExpandClick}
          item={item}
          />
      )
    }).filter(x => x)
  }

  render () {
    return (
      <div>
        <InputGroupWithDisplayCondition
          condition={this.props.items.length > 1}
          style={{marginBottom: 20}}
        >
          <FormControl
            type='text'
            className='filter inline'
            value={this.state.requestedFilterText}
            placeholder='Filter'
            onChange={e => this.setFilterText(e.target.value)}
            autoFocus
          />
          <InputGroup.Button>
            <Button onClick={() => this.setFilterText('')}>
              Reset
            </Button>
          </InputGroup.Button>
        </InputGroupWithDisplayCondition>

        <AddItem
          show={this.state.showAdd}
          onHide={() => this.setState({showAdd: false})}
          onSubmit={this.handleAddItem.bind(this)}
        />

        <Button
          block
          className='items-list-add'
          style={{marginBottom: 20}}
          onClick={() => this.setState({showAdd: true})}
        >
          <Glyphicon glyph='plus' />
        </Button>

        { this.renderItems() }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items || []
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    addItem: function (item) {
      dispatch(addItem(item))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemsList)
