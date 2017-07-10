import React from 'react'
import { connect } from 'react-redux'
import { FormControl, Button, Glyphicon } from 'react-bootstrap'

// import DropboxIntegration from '../DropboxIntegration' // TODO relocate file
import { addItem } from '../actions'
import Item from '../components/Item'
import ShowIf from '../components/ShowIf'
import AddItem from '../containers/AddItem' // TODO: relocate
import './ItemsList.css'

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
    const items = this.props.items.filter(this.filter).map((item, index) => (
      <Item
        onItemChange={(newState) => this.props.onItemChange(newState, index)}
        key={item.name + item.value}
        onDelete={() => this.props.onItemDelete(index)}
        index={index}
        expanded={this.state.expandedItemIndex === index}
        onExpandClick={this.handleExpandClick}
        item={item}
      />
    ))

    return (
      <div>
        {
            // <DropboxIntegration />
            }
        <ShowIf condition={this.props.items.length > 1} >
          <FormControl
            type='text'
            className='filter'
            value={this.state.filterText}
            placeholder='Filter'
            onChange={e => this.setState({filterText: e.target.value})}
          />
        </ShowIf>

        <AddItem
          show={this.state.showAdd}
          onHide={() => this.setState({showAdd: false})}
          onSubmit={this.handleAddItem.bind(this)}
        />

        <Button block className='items-list-add' onClick={() => this.setState({showAdd: true})}>
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
