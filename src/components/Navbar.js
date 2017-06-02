import React from 'react'
import {Nav, NavItem, ButtonToolbar, Button} from 'react-bootstrap'
import './Navbar.css'

export default class Navbar extends React.Component {
  render () {
    return (
      <div className="passway-navbar">
        <div className="passway-brand">
          <a href="#"> Passway </a>
        </div>
        <div className="passway-navbar-right">
          <a href="#settings">Settings </a>
        </div>
      </div>
    )
  }
}
