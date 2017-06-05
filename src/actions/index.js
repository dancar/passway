export const setPasscode = (newPasscode) => {
  return {
    type: 'SET_PASSCODE',
    newPasscode
  }
}

export const addItem = (item) => {
  return {
    type: 'ADD_ITEM',
    item
  }
}

export const setItems = (items) => {
  return {
    type: 'SET_ITEMS',
    items
  }
}

export const deleteItem = (index) => {
  return {
    type: 'DELETE_ITEM',
    index
  }
}

export const changeItem = (item, index) => {
  return {
    type: 'CHANGE_ITEM',
    item,
    index
  }
}

export const setSettings = (settings) => {
  return {
    type: 'SET_SETTINGS',
    settings
  }
}

export const dropboxSetAuthUrl = (url) => {
  return {
    type: 'DROPBOX_SET_AUTH_URL',
    url
  }
}
