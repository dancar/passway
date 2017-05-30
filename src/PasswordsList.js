import React from 'react'
import './PasswordsList.css'
import {Table} from 'react-bootstrap'

class PasswordsList extends React.Component {

  createItems (passwords) {
    return passwords.map( ([key, value], index) => { return (
      <tr key={ key+value }>
        <td>{ key }</td>
        <td>{ value } </td>
      </tr>
    )})
  }
  render (props) {
    return (
      <Table class="table" striped bordered hover responsive>
        <thead>
          <tr>
            <td> Name </td>
            <td> Value </td>
          </tr>
        </thead>
        <tbody>
          {this.createItems(this.props.passwords) }
        </tbody>
      </Table>
    )
  }

}

export default PasswordsList
