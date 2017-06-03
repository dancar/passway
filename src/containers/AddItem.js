import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'

import EditWindow from '../components/EditWindow.js'
import { addItem } from '../actions'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (itemData ) => {
      dispatch(addItem(itemData))
      dispatch(push('/list'))
    },

    onHide: () => {
      dispatch(push('/list'))
    },

    item: {
      name: "",
      value: ""
    },

    title: 'Add',
    show: ownProps.match.isExact
  }
}

export default withRouter(connect(null, mapDispatchToProps)(EditWindow))
