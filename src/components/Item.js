import React, { Component } from 'react'
import { Button, Panel, Glyphicon } from 'react-bootstrap'
import copy from 'copy-to-clipboard'

import EditItem from './EditItem'
import './Item.css'

export default class Item extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showEdit: false
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleCopyClick = this.handleCopyClick.bind(this)
    this.hideEdit = this.hideEdit.bind(this)
  }

  handleCopyClick () {
    copy(this.props.item.value)
  }

  handleEditClick () {
    this.setState({
      showEdit: true
    })
  }

  handleExpandClick () {
    this.props.onExpandClick(this.props.index)
  }

  hideEdit () {
    this.setState({
      showEdit: false
    })
  }

  render (props) {
    return (
      <div className='item' >
        <EditItem
          show={this.state.showEdit}
          index={this.props.index}
          hideMe={this.hideEdit}
          item={this.props.item}
        />

        <Button className='item-button' block onClick={this.handleExpandClick} >{this.props.item.name}</Button>

        <Panel
          collapsible
          expanded={this.props.expanded}
          style={{ visibility: this.props.expanded ? 'visible' : 'hidden' }}
        >
          <div className='item-main'>
            {this.props.item.value}
          </div>

          <Button
            onClick={this.handleEditClick}
            className='item-button'
            bsSize='small'
          >
            <Glyphicon glyph='pencil' />
          </Button>

          <Button
            className='item-button'
            onClick={this.handleCopyClick}
            bsSize='small'
          >
            <Glyphicon glyph='copy' />
          </Button>

        </Panel>

      </div>
    )
  }
}
