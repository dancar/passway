const openpgp = require('openpgp')
// TODO: make this work:
// openpgp.initWorker({ path: 'openpgp.worker.js' })

// Receives content as object, passcode as string
// returns promise<String>
export async function encrypt (content, passcode) {
  let options = {
    data: JSON.stringify(content, null, '\t'),
    passwords: [passcode],
    armor: true
  }

  return openpgp.encrypt(options).then((ciphertext) => {
    return ciphertext.data
  })
}

// Receives ciphertext which should be armored
// Returns Object
export async function decrypt (ciphertext, password) {
  let plaintext, ans, message
  if (typeof ciphertext === 'string') {
    message = openpgp.message.readArmored(ciphertext)
  } else {
    message = openpgp.message.read(ciphertext)
  }
  plaintext = await openpgp.decrypt({message, password})
  ans = await JSON.parse(plaintext.data)
  return ans
}

export function subscribeToStore (store) {
  let previousItems
  // Register as a listener to the store in order to encrypt state.items everytime they change
  store.subscribe(() => {
    const currentState = store.getState()
    const currentItems = currentState.items
    if (!currentItems) {
      return
    }

    if (currentItems !== previousItems) {
      encrypt(currentItems, currentState.passcode)
      .then((encryptedItems) => {
        store.dispatch({type: 'NEW_ENCRYPTED_CONTENT', encryptedItems})
      })
    }
    previousItems = currentItems
  })
}
