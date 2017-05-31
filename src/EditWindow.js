import React, {Component} from 'react'
import {Modal, Button, FormControl, ControlLabel} from 'react-bootstrap'

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

  render () {
    return (
      <Modal
        onHide={this.props.onHide}
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
          <Button type="submit" onClick={this.handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
  )
  }
}
