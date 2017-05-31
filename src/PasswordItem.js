import React, {Component} from 'react'
import {Button, Panel, Glyphicon, Table} from 'react-bootstrap'
import copy from 'copy-to-clipboard'
import './PasswordItem.css'

export default class PasswordItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.setState({expanded: !this.state.expanded})
  }

  handleCopyClick = (e) => {
    copy(this.props.item.value)
  }

  render (props) {
    return (
      <div className="password-item" >
        <Button block onClick={this.handleClick} >{this.props.item.name}</Button>
        <Panel collapsible expanded={this.state.expanded} style={{visibility: this.state.expanded ? "visible" : "hidden" }} >
          <div className="password-item-main">
            {this.props.item.value}
          </div>

          <Button
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
      </div>
    )
  }
}
