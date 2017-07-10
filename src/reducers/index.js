/* globals localStorage */
import dropbox from './dropbox.js'

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
  if (action.type === 'NEW_ENCRYPTED_CONTENT') {
    localStorage.encryptedContent = action.encryptedItems
    return action.encryptedItems
  }

  if (state === undefined) {
    return localStorage.encryptedContent || null
  }

  return state
}

export default {
  items,
  passcode,
  dropbox,
  encryptedContent
}
