import React, {Component} from 'react'
import {Modal, Button, FormControl, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap'

export default class EditWindow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.item.name,
      value: props.item.value,
    }
  }

  handleSubmit = () => {
    this.props.onSubmit({
      name: this.state.name,
      value: this.state.value
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  displayOptions () {
    return
  }

  render () {
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show} >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
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
          <div style={ {
                 display: this.props.showDelete ? 'block' : 'none',
                 float: 'left'
               }} >
          <DropdownButton
            title="Options"
            id="edit-window-options">

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
