import { connect } from 'react-redux'
import ItemsList from '../components/ItemsList.js'


const mapStateToProps = (state) => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps)(ItemsList)
