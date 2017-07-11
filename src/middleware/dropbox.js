/* globals fetch */

import { mergeItems, dropboxSetAuthUrl, dropboxFetch } from '../actions'
import Dropbox from 'dropbox'
import * as crypto from '../crypto.js'

export const COPY_TOKEN_PAGE = 'https://www.dropbox.com/1/oauth2/display_token'
const FILE_PATH = '/passway.txt.gpg'
const CLIENT_ID = 'oir8xvi101xx01y'

export default store => {
  let lastRev, dbx

  function init () {
    dbx = new Dropbox({
      clientId: CLIENT_ID
    })
    store.dispatch(dropboxSetAuthUrl(dbx.getAuthenticationUrl(COPY_TOKEN_PAGE)))
  }

  async function fetchItems ({accessKey, passcode}) {
    if (!passcode || !accessKey) {
      return null
    }

    dbx.setAccessToken(accessKey)
    const link = await dbx.filesGetTemporaryLink({path: FILE_PATH})
    if (lastRev === link.metadata.rev) {
      // This file has already been downloaded
      console.log(`Dropbox file "${lastRev}" already fetched.`)
      return null
    }

    lastRev = null
    const response = await fetch(link.link)
    lastRev = link.metadata.rev
    const contentType = response.headers.get('content-type')

    let encryptedContent
    if (contentType.match(/text/)) {
      encryptedContent = await response.text()
    } else {
      const contentArrayBuffer = await response.arrayBuffer()
      encryptedContent = new Uint8Array(contentArrayBuffer)
    }

    let content = null
    try {
      content = await crypto.decrypt(encryptedContent, passcode)
    } catch (e) {
      console.error(e)
      console.error('Failed decrypting dropbox content')
    }
    return content
  }

  async function uploadItems ({accessKey, encryptedContent}) {
    dbx.setAccessToken(accessKey)
    return dbx.filesUpload({
      path: FILE_PATH,
      autorename: false,
      mode: lastRev
        ? { '.tag': 'update', update: lastRev }
        : {'.tag': 'add'},
      contents: encryptedContent
    })
  }

  return next => action => {
    const state = store.getState()
    const accessKey = state.dropbox.settings.accessKey
    if (action.type === 'INIT_MIDDLEWARE') {
      init()
    }

    if (action.type === 'DROPBOX_UPLOAD' &&
       accessKey) {
      uploadItems({
        encryptedContent: state.encryptedContent,
        accessKey
      })
        .then((response) => {
          console.log('UPLOAD SUCCESS')
        })
        .catch(error => {
          if (error.status === 409) {
            console.log('Update rejected for rev ' + this.rev)
            store.dispatch(dropboxFetch())
          } else {
            console.error('Dropbox upload error', error)
          }
        })
    }

    if (action.type === 'DROPBOX_FETCH') {
      const passcode = state.passcode
      fetchItems({accessKey, passcode})
        .then(items => items && store.dispatch(mergeItems(items)))
    }
    return next(action)
  }
}
