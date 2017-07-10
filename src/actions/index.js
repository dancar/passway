/* globals localStorage */
import { decrypt } from '../crypto'

export const setPasscode = (newPasscode) => {
  return {
    type: 'SET_PASSCODE',
    newPasscode
  }
}

export const setPasscodeAndDecrypt = (newPasscode) => (dispatch) =>
  decrypt(localStorage.encryptedContent, newPasscode)
  .then(function (newItems) {
    dispatch(setPasscode(newPasscode))
    dispatch(mergeItems(newItems))
  })
// TODO: error handling

export const initItems = (items) => {
  return {
    items,
    type: 'INIT_ITEMS'
  }
}

export const addItem = (item) => {
  return {
    type: 'ADD_ITEM',
    item
  }
}

export const mergeItems = (items) => {
  return {
    type: 'MERGE_ITEMS',
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

export const dropboxSetSettings = (settings) => {
  return {
    type: 'DROPBOX_SET_SETTINGS',
    settings
  }
}

export const dropboxSetAuthUrl = (url) => {
  return {
    type: 'DROPBOX_SET_AUTH_URL',
    url
  }
}
