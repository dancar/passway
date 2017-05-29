import React from 'react'

class PasswordsList extends React.Component {

  createItems (passwords) {
    return passwords.map( ([key, value], index) => { return (
        <li>
        <b>{ key }</b>: {value}
      </li>
    )})
  }
  render (props) {
    return (
        <ul>
        {this.createItems(this.props.passwords) }
      </ul>
    )
  }

}

export default PasswordsList
