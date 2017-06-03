import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import {Button, Panel, Glyphicon} from 'react-bootstrap'

export default class ItemDetails extends Component {
  constructor (props) {
    super(props)
    this.editUrl = `${this.props.index}/edit`
  }

  render = () => {
    return (
      <Panel collapsible expanded={this.props.expanded}
             style={{visibility: this.props.expanded ? "visible" : "hidden" }} >
          <div className="item-main">
            {this.props.item.value}
          </div>

          <Link to={this.editUrl}>
            <Button
              onClick={this.handleEditClick}
              className="item-button"
              bsSize="small" >
              <Glyphicon glyph="pencil" />
            </Button>
          </Link>
          <Button
            className="item-button"
            onClick={this.handleCopyClick}
            bsSize="small" >
            <Glyphicon glyph="copy" />
          </Button>

        </Panel>

    )
  }
}
