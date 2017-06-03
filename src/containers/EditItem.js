import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import EditWindow from '../components/EditWindow.js'
import {changeItem, deleteItem} from '../actions'

const getIndex = ownProps => parseInt(ownProps.match.params.index, 10)

const mapDispatchToProps = (dispatch, ownProps) => {
  const index = getIndex(ownProps)
  const goBack = () => {
    const itemUrl = `/list/${index}`
    ownProps.history.push(itemUrl)
  }

  return {
    onSubmit: (itemData ) => {
      dispatch(changeItem(itemData, index))
      goBack()
    },

    onHide: () => {
      goBack()
    },

    onDelete: () => {
      dispatch(deleteItem(index))
      ownProps.history.push('/list')
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const index = getIndex(ownProps)
  const item = state.items[index]
  return {
    item,
    index,
    title: 'Edit',
    showDelete: true,
    show: !!item
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditWindow))
