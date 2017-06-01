import React from 'react'
import {Navbar, Nav, NavItem, ButtonToolbar, Button} from 'react-bootstrap'
import './PasswayNavbar.css'

export default class PasswayNavbar extends React.Component {
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
