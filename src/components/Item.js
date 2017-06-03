import React, { Component } from 'react'
import { Route } from 'react-router'
import { Link }  from 'react-router-dom'
import { Button } from 'react-bootstrap'
import copy from 'copy-to-clipboard'

import ItemDetails from './ItemDetails.js'
import './Item.css'

export default class Item extends Component {
  constructor (props) {
    super(props)
    this.itemUrl = `/list/${this.props.index}`
  }

  handleCopyClick = (e) => {
    copy(this.props.item.value)
  }

  render (props) {
    return (
      <Route path={this.itemUrl} children={({match, ...rest})=> {
          const expanded=!!match
          const to = expanded ? '/list' : this.itemUrl
          return (
            <div className="item" >
              <Link to={to}>
                <Button block >{this.props.item.name}</Button>
              </Link>
              <ItemDetails
                item={this.props.item}
                index={this.props.index}
                expanded={ expanded }
                />
            </div>
          )
      }}/>
    )
  }
}
