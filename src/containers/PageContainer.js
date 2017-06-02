import { connect } from 'react-redux'
import {setPasscode, addItem, changeItem, deleteItem} from '../actions'
import CurrentPage from '../components/CurrentPage'

const mapStateToProps = (state) => {
  return {
    step: state.passcode ? 'STEP_MAIN' : 'STEP_CREATE_PASSCODE',
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleItemAdd: (newItem) => {
      dispatch(addItem(newItem))
    },

    handlePasscodeCreate: (newPasscode) => {
      dispatch(setPasscode(newPasscode))
    },

    handleItemChange: (item, index) => {
      dispatch(changeItem(item, index))
    },

    handleItemDelete: (index) => {
      dispatch(deleteItem(index))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps)(CurrentPage)
