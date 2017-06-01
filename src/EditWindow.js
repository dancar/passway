import React, {Component, PropTypes} from 'react'
import {Modal, Button, FormControl, ControlLabel, DropdownButton, MenuItem, ButtonGroup} from 'react-bootstrap'

export default class EditWindow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.item.name || "",
      value: props.item.value || "",
      originalName: props.item.name || "",
      originalValue: props.item.value || ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    this.setState({
      originalName: this.state.name,
      originalValue: this.state.value
    })
    this.props.onSubmit({
      name: this.state.name,
      value: this.state.value
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleHide = () => {
    this.setState({
      name: this.state.originalName,
      value: this.state.originalValue
    })
    this.props.onHide()
  }

  static idCounter = 0
  static generateId () {
    return "edit-window-item" + (EditWindow.idCounter++)
  }


  displayOptions () {
    return this.props.showDelete ? "block" : "none"
  }

  render () {
    return (
      <Modal
        onHide={this.handleHide}
        show={this.props.show} >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title || "Edit"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <ControlLabel>Name:</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              type="text"
              value={this.state.name}
              placeholder="Name"
              name="name"
              / >

              <br />

              <ControlLabel>Value:</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              componentClass="textarea"
              value={this.state.value}
              name="value"
              placeholder="Value"
              />

          </form>
        </Modal.Body>

        <Modal.Footer>
          <div style={{display: this.displayOptions(), float: "left"}} >
          <DropdownButton
            title="Options"
            id={EditWindow.generateId()}>

            <MenuItem eventKey="1"
                      onClick={this.props.onDelete}
                      > Delete </MenuItem>

          </DropdownButton></div>

          <Button
            type="submit"
            bsStyle="primary"
            onClick={this.handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
