import React, {Component} from 'react'
import {Button, Panel, Glyphicon, Table} from 'react-bootstrap'
import './PasswordItem.css'

export default class PasswordItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick (e) {
    this.setState({expanded: !this.state.expanded})
  }

  render (props) {
    return (
      <div className="password-item" >
        <Button block onClick={this.handleOnClick} >{this.props.item.name}</Button>
        <Panel collapsible expanded={this.state.expanded} style={{visibility: this.state.expanded ? "visible" : "hidden" }} >
          <Table>
            <tr>
              <td className="password-item-main">
                {this.props.item.value}
              </td>
              <td className="password-item-buttons">
                <Button bsSize="small"><Glyphicon glyph="pencil" /></Button>
              </td>
            </tr>
          </Table>
        </Panel>
      </div>
    )
  }
}
