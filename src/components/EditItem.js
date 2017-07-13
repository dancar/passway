import { connect } from 'react-redux'

import EditWindow from '../components/EditWindow'
import { changeItem, deleteItem } from '../actions'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (itemData) => {
      dispatch(changeItem(itemData, ownProps.index))
      ownProps.hideMe()
    },

    onDelete: () => {
      dispatch(deleteItem(ownProps.index))
      ownProps.hideMe()
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const {item, index} = ownProps
  return {
    item,
    index,
    title: 'Edit',
    showDelete: true
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditWindow)
