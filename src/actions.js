/* globals localStorage */
import { decrypt } from './crypto'

let clearMessageTimeout = null
const CLEAR_MESSAGE_TIMEOUT = 3000
export const message = (text, type) => dispatch => {
  if (clearMessageTimeout) {
    clearTimeout(clearMessageTimeout)
  }
  clearMessageTimeout = setTimeout(() => dispatch({
    type: 'CLEAR_MESSAGE'
  }), CLEAR_MESSAGE_TIMEOUT)

  dispatch({
    type: 'MESSAGE',
    messageType: type,
    text
  })
}

export const infoMessage = text => message(text, 'info')
export const errorMessage = text => message(text, 'error')

export const initMiddleware = () => ({
  type: 'INIT_MIDDLEWARE'
})
export const setPasscode = newPasscode => ({
  type: 'SET_PASSCODE',
  newPasscode
})

export const createPasscode = newPasscode => dispatch => {
  dispatch(setPasscode(newPasscode))
  dispatch(initItems([]))
  dispatch(dropboxFetch())
}

export const enterPasscode = (passcode) => (dispatch) =>
  decrypt(localStorage.encryptedContent, passcode)
  .then(function (newItems) {
    dispatch(setPasscode(passcode))
    dispatch(initItems(newItems))
    dispatch(dropboxFetch())
  })
  .catch((e) => {
    if (e.message.match(/decrypting/i)) {
      dispatch(errorMessage('Decryption error. Bad password?'))
    }
  })

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

export const saveEncryptedItems = (encryptedItems) => (dispatch, getState) => {
  dispatch({
    type: 'SAVE_ENCRYPTED_CONTENT',
    encryptedItems
  })
  dispatch(dropboxUpload())
}

export const dropboxSetSettings = (name, value) => (dispatch, getState) => {
  dispatch({
    type: 'DROPBOX_SET_SETTINGS',
    name,
    value
  })
  dispatch(dropboxFetch())
}

export const dropboxSetAuthUrl = (url) => ({
  type: 'DROPBOX_SET_AUTH_URL',
  url
})

export const dropboxFetch = () => ({
  type: 'DROPBOX_FETCH'
})

export const dropboxUpload = () => ({
  type: 'DROPBOX_UPLOAD'
})

export const clearCacheAndReset = () => ({
  type: 'CLEAR_CACHE_AND_RESET'
})
