import React, {Component} from 'react'
import { Modal, Button, FormControl, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap'

export default class EditWindow extends Component {
  constructor (props) {
    super(props)
    const {name, value} = props.item
    this.state = {
      name,
      value
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleHide = this.handleHide.bind(this)
  }

  componentWillReceiveProps (newProps) {
    const {name, value} = newProps.item
    this.state = {
      name,
      value
    }
  }

  handleSubmit () {
    this.props.onSubmit({
      name: this.state.name,
      value: this.state.value
    })
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleHide () {
    this.props.hideMe()
  }

  render () {
    return (
      <Modal
        onHide={this.handleHide}
        show={this.props.show} >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <ControlLabel>Name:</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              type='text'
              value={this.state.name}
              placeholder='Name'
              name='name'
            />

            <br />

            <ControlLabel>Value:</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              componentClass='textarea'
              value={this.state.value}
              name='value'
              placeholder='Value'
              />

          </form>
        </Modal.Body>

        <Modal.Footer>
          <div style={{
            display: this.props.showDelete ? 'block' : 'none',
            float: 'left'
          }} >
            <DropdownButton
              title='Options'
              id='edit-window-options'>

              <MenuItem eventKey='1'
                onClick={this.props.onDelete}
                      > Delete </MenuItem>

            </DropdownButton></div>

          <Button
            type='submit'
            bsStyle='primary'
            onClick={this.handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
