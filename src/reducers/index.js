import { combineReducers } from 'redux'

const passcode = (state = null , action) => {
  if (action.type === 'SET_PASSCODE') {
    return action.newPasscode
  }
  return state
}

const items = (state = null, action) => {
  if (action.type === 'ADD_ITEM')
    return [...state, action.item]
  if (action.type === 'DELETE_ITEM')
    return state.filter((item, index) => index !== action.index)
  if (action.type === 'CHANGE_ITEM')
    return state.map((item, index) => {
      if (index === action.index)
        return action.item
      return item
    })
  if (action.type === 'SET_PASSCODE' && state === null) {
    // if a new passcode has been set, init empty list
    return []
  }
  return state
}

const encryptedContent = (state = localStorage.encryptedContent || null, action) => {
  return state
}

export default combineReducers({
  items,
  passcode,
  encryptedContent
})
