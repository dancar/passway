import React from 'react'
import './PasswordsList.css'
import {PanelGroup} from 'react-bootstrap'
import PasswordItem from './PasswordItem'
class PasswordsList extends React.Component {

  createItem (item, index) {
    return (
      <PasswordItem index={index} key={ item.name + item.value } item={item}/>
    )
  }
  render (props) {
    return (
      <PanelGroup defaultActiveKey="1" >
        { this.props.passwords.map(this.createItem) }
      </PanelGroup>
    )
  }

}

export default PasswordsList
