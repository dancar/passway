import React from 'react'
import { connect } from 'react-redux'
import { FormControl, InputGroup, Button, Glyphicon } from 'react-bootstrap'

import { addItem } from '../actions'
import Item from '../components/Item'
import withDisplayCondition from '../components/withDisplayCondition'
import AddItem from '../containers/AddItem' // TODO: relocate
import './ItemsList.css'

const InputGroupWithDisplayCondition = withDisplayCondition(InputGroup)

class ItemsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expandedItemIndex: null,
      showAdd: false,
      selected: null,
      filterText: ''
    }
    this.filter = this.filter.bind(this)
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }

  filter (item) {
    const filterText = this.state.filterText.trim().toLowerCase()
    if (filterText.length === 0) { return true }

    return item.name.toLowerCase().indexOf(filterText) > -1
  }

  handleAddItem (item) {
    this.setState({showAdd: false})
    this.props.addItem(item)
  }

  handleExpandClick (index) {
    const expandedItemIndex = this.state.expandedItemIndex === index ? null : index
    this.setState({expandedItemIndex})
  }

  render (props) {
    const items = this.props.items.map((item, index) => {
      if (!this.filter(item)) {
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

    return (
      <div>
        <InputGroupWithDisplayCondition
          style={{marginBottom: 20}}
          condition={this.props.items.length > 1}
        >
          <FormControl
            type='text'
            className='filter inline'
            value={this.state.filterText}
            placeholder='Filter'
            onChange={e => this.setState({filterText: e.target.value})}
            autoFocus
          />
          <InputGroup.Button>
            <Button onClick={() => this.setState({filterText: ''})}>
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

        { items }
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
