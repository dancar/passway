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

const encryptedContent = (state = localStorage.encryptedContent || null, action) => {
  if (action.type === 'NEW_ENCRYPTED_CONTENT') {
    localStorage.encryptedContent = action.encryptedItems
    return action.encryptedItems
  }
  return state
}

const settings = (state = JSON.parse(localStorage.settings || '{}'), action) => {
  if (action.type === 'SET_SETTINGS') {
    const newSettings= Object.assign({}, state, action.settings)
    localStorage.settings = JSON.stringify(newSettings)
    return newSettings
  }
  return state
}

const dropbox = (state = {authUrl: ""}, action) => {
  if (action.type === 'DROPBOX_SET_AUTH_URL')
    return Object.assign({}, state, {authUrl: action.url})
  return state
}

export default {
  items,
  passcode,
  settings,
  dropbox,
  encryptedContent
}
