/* globals localStorage */
import { combineReducers } from 'redux'
import dropbox from './dropbox.js'

const message = (state = {text: '', messageType: ''}, action) => {
  if (action.type === 'MESSAGE') {
    return {
      text: action.text,
      type: action.messageType
    }
  }

  if (action.type === 'CLEAR_MESSAGE') {
    return {
      text: '',
      type: ''
    }
  }

  return state
}
const passcode = (state = null, action) => {
  if (action.type === 'SET_PASSCODE') {
    return action.newPasscode
  }
  return state
}

const items = (state = null, action) => {
  if (action.type === 'INIT_ITEMS') {
    return action.items
  }

  if (action.type === 'ADD_ITEM') {
    return [...state, action.item]
  }

  if (action.type === 'DELETE_ITEM') {
    return state.filter((item, index) => index !== action.index)
  }

  if (action.type === 'CHANGE_ITEM') {
    return state.map((item, index) => {
      return index === action.index
        ? action.item
        : item
    })
  }

  if (action.type === 'MERGE_ITEMS') {
    // return Object.assign({}, state, action.items) // TODO timetsamp-based merge?
    return action.items
  }

  return state
}

const encryptedContent = (state, action) => {
  if (action.type === 'SAVE_ENCRYPTED_CONTENT') {
    localStorage.encryptedContent = action.encryptedItems
    return action.encryptedItems
  }

  if (state === undefined) {
    return localStorage.encryptedContent || null
  }

  return state
}

const appReducer = combineReducers({
  message,
  items,
  passcode,
  dropbox,
  encryptedContent
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_CACHE_AND_RESET') {
    window.localStorage.clear()
    window.location.reload()
  }

  return appReducer(state, action)
}

export default rootReducer
