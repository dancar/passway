import * as openpgp from 'openpgp';
// TODO: make this work: openpgp.initWorker({ path: 'openpgp.worker.js' })
openpgp.config.aead_protect = true

// Receives content as object, passcode as stringify
// returns promise<Uint8Array>
const encrypt = (content, passcode) => {
  let options = {
    data: JSON.stringify(content),
    passwords: [passcode],
    armor: false
  }

  return openpgp.encrypt(options).then( (ciphertext) => {
    return ciphertext.message.packets.write()
  })
}

// Receives ciphertext which shoudl be Uint8Array
// Returns Object
export const decrypt = (ciphertext, passcode) => {
  return openpgp.decrypt({
    message: openpgp.message.read(ciphertext),
    password: passcode,
    format: 'binary'
  }).then( plaintext => JSON.parse(new TextDecoder('utf-8').decode(plaintext.data)) )
}

export const subscribeToStore = (store) => {
  let previousItems
  // Register as a listener to the store in order to encrypt state.items everytime they change
  store.subscribe(() => {
    const currentState = store.getState()
    const currentItems = currentState.items
    if (!currentItems)
      return

    if (currentItems !== previousItems) {
      encrypt(currentItems, currentState.passcode)
      .then( (encryptedItems) => {
        store.dispatch({type: 'NEW_ENCRYPTED_CONTENT', encryptedItems})
      })
    }
    previousItems = currentItems
  })
}

window.c = {encrypt, decrypt}
