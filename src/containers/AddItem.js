import EditWindow from '../components/EditWindow.js'

import React from 'react'

export default class AddItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      item: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleHide = this.handleHide.bind(this)
  }
  componentWillMount () {
    this.reset()
  }

  reset () {
    this.setState({
      item: {
        name: '',
        value: ''
      }
    })
  }

  handleSubmit (item) {
    this.props.onSubmit(item)
    this.reset()
  }

  handleHide () {
    this.reset()
    this.props.onHide()
  }

  render () {
    return (
      <EditWindow
        show={this.props.show}
        title='Add'
        onSubmit={this.handleSubmit}
        onHide={this.handleHide}
        item={this.state.item}
      />
    )
  }
}
