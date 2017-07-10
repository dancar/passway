import React from 'react'
import { connect } from 'react-redux'
import Dropbox from '../DropboxIntegration.js'

const statusMessages = {
  [Dropbox.STATUS_DISABLED]: 'Disabled',
  [Dropbox.STATUS_CONNECTING]: 'Connecting...',
  [Dropbox.STATUS_SYNCED]: 'synced'
}
class DropboxStatus extends React.Component {
  render (props) {
    return (
      <div>
        { statusMessages[this.props.status] }
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
