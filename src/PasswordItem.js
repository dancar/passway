import React, {Component} from 'react'
import {Button, Panel, Glyphicon} from 'react-bootstrap'
import copy from 'copy-to-clipboard'
import './PasswordItem.css'
import EditWindow from './EditWindow.js'

export default class PasswordItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.handleHeaderClick = this.handleHeaderClick.bind(this)
  }

  handleHeaderClick (e) {
    this.setState({expanded: !this.state.expanded})
  }

  handleEditClick = (e) => {
    this.setState({showEdit: true})
  }

  handleCopyClick = (e) => {
    copy(this.props.item.value)
  }

  handleEditSubmit = (newState) => {
    this.setState({showEdit: false})
    this.props.onItemChange(newState)
  }

  render (props) {
    return (
      <div className="password-item" >
        <Button block onClick={this.handleHeaderClick} >{this.props.item.name}</Button>
        <Panel collapsible expanded={this.state.expanded} style={{visibility: this.state.expanded ? "visible" : "hidden" }} >
          <div className="password-item-main">
            {this.props.item.value}
          </div>

          <Button
            onClick={this.handleEditClick}
            className="password-item-button"
            bsSize="small" >
            <Glyphicon glyph="pencil" />
          </Button>

          <Button
            className="password-item-button"
            onClick={this.handleCopyClick}
            bsSize="small" >
            <Glyphicon glyph="copy" />
          </Button>

        </Panel>
        <EditWindow
          onHide={() => {this.setState({showEdit: false})}}
          onSubmit={this.handleEditSubmit}
          show={this.state.showEdit}
          item={this.props.item}
          />
      </div>
    )
  }
}
