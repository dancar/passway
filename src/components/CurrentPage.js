import React from 'react'
import CreatePasscode from './CreatePasscode.js'
import ItemsList from './ItemsList.js'

export default class CurrentPage extends React.Component {
  render () {
    if (this.props.step === 'STEP_MAIN') {
      return this.renderMain()
    }

    if (this.props.step === 'STEP_CREATE_PASSCODE') {
      return this.renderCreatePasscode()
    }
    throw new Error('Invalid Step: ' + this.props.step)
  }

  renderCreatePasscode () {
    return (
      <CreatePasscode onSubmit={this.props.handlePasscodeCreate} />
    )
  }

  renderMain () {
    return (
      <ItemsList
        onItemChange={this.props.handleItemChange}
        onItemDelete={this.props.handleItemDelete}
        onItemAdd={this.props.handleItemAdd}
        items={this.props.items}
        />
    )
  }
}
