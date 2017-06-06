import * as crypto from './crypto.js'
import * as gpg2Crypto from './gpg2crypto.js'

window.StringDecoder = require('string_decoder').StringDecoder

// openpgpjs doesn't like the random number generator so we mock it
window.crypto = {getRandomValues: () => 1}

it('encodes and decodes a string successfully', () => {
  const testString = 'hello world'
  const passcode = "1"
  return crypto.encrypt(testString, passcode)
    .then( encrypted => crypto.decrypt(encrypted, passcode))
    .then( decrypted => expect(decrypted).toBe(testString))
})


it('encodes and decodes an object successfully', () => {
  const testObject = {hello: 'world'}
  const passcode = "1"
  return crypto.encrypt(testObject, passcode)
    .then( encrypted => crypto.decrypt(encrypted, passcode))
    .then( decrypted => expect(decrypted).toEqual(testObject))
})


it('should fail if the passcode is wrong', async () => {
  const test_data = { hello: 'world' }
  const encrypted = await crypto.encrypt(test_data, '1')
  try {
    await crypto.decrypt(encrypted, '3')
  } catch (e) {
    expect(e.message).toMatch(/invalid enum value/i)
  }
})


it('should encode a file that can be decoded by gpg', => {

})
