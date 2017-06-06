import * as crypto from './crypto.js'
import * as gpg2crypto from './gpg2crypto.js'

window.StringDecoder = require('string_decoder').StringDecoder

// openpgpjs doesn't like the random number generator so we mock it
window.crypto = {getRandomValues: () => 1}

it('encodes and decodes a string successfully', () => {
  const testString = 'hello world'
  const passcode = '1'
  return crypto.encrypt(testString, passcode)
    .then( encrypted => crypto.decrypt(encrypted, passcode))
    .then( decrypted => expect(decrypted).toBe(testString))
})


it('encodes and decodes an object successfully', async () => {
  const testObject = {hello: 'world'}
  const passcode = '1'

  const testObject2 = ['array', 'of', 'stuff']
  const passcode2 = 'longpasscodeverylongindeed'

  const encrypted2 = await crypto.encrypt(testObject2, passcode2)
  const decrypted2 = await crypto.decrypt(encrypted2, passcode2)
  expect(decrypted2).toEqual(testObject2)

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

it('should encode content that can be decoded by gpg', async () => {
  const content = 'my great content'
  const passcode = '1'

  const encrypted = await crypto.encrypt(content, passcode)
  const decrypted = JSON.parse(gpg2crypto.decrypt(encrypted, passcode))
  expect(decrypted).toEqual(content)
})

it('should decode content encrypted by gpg', () => {
  const content = {hello: ['world']}
  const passcode = '1'
  const encryptedContent = gpg2crypto.encrypt(JSON.stringify(content), passcode)
  return crypto.decrypt(encryptedContent, passcode)
    .then( (result) => {
      expect(result).toEqual(content)
    })
})
