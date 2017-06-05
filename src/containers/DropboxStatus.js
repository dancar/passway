import React from 'react'
import { connect } from 'react-redux'
import Dropbox from '../DropboxIntegration.js'

class DropboxStatus extends React.Component {

  statusMessages = {
    [Dropbox.STATUS_DISABLED]: "Disabled",
    [Dropbox.STATUS_CONNECTING]: "Connecting...",
    [Dropbox.STATUS_SYNCED]: "synced"
  }

  render (props) {
    return (
      <div>
        { this.statusMessages[this.props.status] }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.dropbox.status
  }
}

export default connect(mapStateToProps)(DropboxStatus)
