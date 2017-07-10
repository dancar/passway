import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import EditWindow from '../components/EditWindow.js'
import {changeItem, deleteItem} from '../actions'

const getIndex = ownProps => parseInt(ownProps.match.params.index, 10)

const mapDispatchToProps = (dispatch, ownProps) => {
  const index = getIndex(ownProps)
  const itemUrl = `/list/${index}`

  return {
    onSubmit: (itemData) => {
      dispatch(changeItem(itemData, index))
      dispatch(push(itemUrl))
    },

    onHide: () => {
      dispatch(push(itemUrl))
    },

    onDelete: () => {
      dispatch(deleteItem(index))
      dispatch(push('/list'))
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
