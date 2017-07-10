/* globals localStorage */
import { decrypt } from '../crypto'

export const setPasscode = (newPasscode) => ({
  type: 'SET_PASSCODE',
  newPasscode
})

export const setPasscodeAndDecrypt = (newPasscode) => (dispatch) =>
  decrypt(localStorage.encryptedContent, newPasscode)
  .then(function (newItems) {
    dispatch(setPasscode(newPasscode))
    dispatch(initItems(newItems))
  })
// TODO: error handling

export const initItems = (items) => ({
  items,
  type: 'INIT_ITEMS'
})

export const addItem = (item) => ({
  type: 'ADD_ITEM',
  item
})

export const mergeItems = (items) => ({
  type: 'MERGE_ITEMS',
  items
})

export const deleteItem = (index) => ({
  type: 'DELETE_ITEM',
  index
})

export const changeItem = (item, index) => ({
  type: 'CHANGE_ITEM',
  item,
  index
})

export const dropboxSetSettings = (settings) => ({
  type: 'DROPBOX_SET_SETTINGS',
  settings
})

export const dropboxSetAuthUrl = (url) => ({
  type: 'DROPBOX_SET_AUTH_URL',
  url
})
