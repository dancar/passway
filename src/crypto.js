const openpgp = require('openpgp');
// TODO: make this work: openpgp.initWorker({ path: 'openpgp.worker.js' })

// Receives content as object, passcode as stringify
// returns promise<String>
const encrypt = (content, passcode) => {
  let options = {
    data: JSON.stringify(content),
    passwords: [passcode],
    armor: true
  }

  return openpgp.encrypt(options).then( (ciphertext) => {
    return ciphertext.data
  })
}

// Receives ciphertext which shoudl be armored
// Returns Object
const decrypt = (ciphertext, passcode) => {
  return openpgp.decrypt({
    message: openpgp.message.readArmored(ciphertext),
    password: passcode
  }).then( plaintext => JSON.parse(plaintext.data))
}

exports.subscribeToStore = (store) => {
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
exports.decrypt = decrypt
exports.encrypt = encrypt
