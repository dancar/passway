import * as openpgp from 'openpgp';
// TODO: make this work: openpgp.initWorker({ path: 'openpgp.worker.js' })
openpgp.config.aead_protect = true

const encrypt = (content, passcode) => {
  let options = {
    data: JSON.stringify(content),
    passwords: [passcode]
  }

  return openpgp.encrypt(options).then( (ciphertext) => {
    return ciphertext.data
  })
}

export const decrypt = (ciphertext, passcode) => {
  return openpgp.decrypt({
    message: openpgp.message.readArmored(ciphertext),
    password: passcode
  }).then( plaintext => JSON.parse(plaintext.data) )
}

export const subscribeToStore = (store) => {
  let previousItems
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
