import React from 'react'
import { Link } from 'react-router-dom'

import DropboxIntegration from '../containers/DropboxIntegration.js'
import './Navbar.css'

export default class Navbar extends React.Component {
  render () {
    return (
      <div className="passway-navbar">
        <div className="passway-brand">
          <Link to={ '/' }> Passway </Link>
        </div>
        <div className="passway-navbar-right">
          <DropboxIntegration />
          <Link to={ '/settings' }>Settings </Link>
        </div>
      </div>
    )
  }
}
