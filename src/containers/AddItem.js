import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import EditWindow from '../components/EditWindow.js'
import { addItem } from '../actions'

const mapDispatchToProps = (dispatch, ownProps) => {
  const goBack = () => {
    ownProps.history.push('/list')
  }

  return {
    onSubmit: (itemData ) => {
      dispatch(addItem(itemData))
      goBack()
    },

    onHide: () => {
      goBack()
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
