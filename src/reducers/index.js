import dropbox from './dropbox.js'

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

  if (action.type === 'SET_ITEMS')
    return action.items

  if (action.type === 'SET_PASSCODE' && state === null) {
    // if a new passcode has been set, init empty list
    // TODO: if there is encrypted content, try decrypting it first
    return []
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
