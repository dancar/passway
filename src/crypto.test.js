/* eslint-env mocha */
/* globals expect */

import * as crypto from './crypto.js'
import * as gpg2crypto from './gpg2crypto.js'

// openpgpjs doesn't like the random number generator so we mock it
window.crypto = {getRandomValues: () => 1}

it('encrypts and decrypts a string successfully', () => {
  const testString = 'hello world'
  const passcode = '1'
  return crypto.encrypt(testString, passcode)
    .then(encrypted => crypto.decrypt(encrypted, passcode))
    .then(decrypted => expect(decrypted).toBe(testString))
})

it('encrypts and decrypts an object successfully', async () => {
  const testObject = {hello: 'world'}
  const passcode = '1'

  const testObject2 = ['array', 'of', 'stuff']
  const passcode2 = 'longpasscodeverylongindeed'

  const encrypted2 = await crypto.encrypt(testObject2, passcode2)
  const decrypted2 = await crypto.decrypt(encrypted2, passcode2)
  expect(decrypted2).toEqual(testObject2)

  return crypto.encrypt(testObject, passcode)
    .then(encrypted => crypto.decrypt(encrypted, passcode))
    .then(decrypted => expect(decrypted).toEqual(testObject))
})

it('should fail if the passcode is wrong', async () => {
  const testData = { hello: 'world' }
  const encrypted = await crypto.encrypt(testData, '1')
  try {
    await crypto.decrypt(encrypted, '3')
  } catch (e) {
    expect(e.message).toMatch(/invalid enum value/i)
  }
})

it('should encrypt content that can be decrypted by gpg', async () => {
  const content = 'my great content'
  const passcode = '1'

  const encrypted = await crypto.encrypt(content, passcode)
  const decrypted = JSON.parse(gpg2crypto.decrypt(encrypted, passcode))
  expect(decrypted).toEqual(content)
})

it('should decrypt content encrypted by gpg', () => {
  const content = {hello: ['world']}
  const passcode = '1'
  const encryptedContent = gpg2crypto.encrypt(JSON.stringify(content), passcode)
  return crypto.decrypt(encryptedContent, passcode)
    .then((result) => {
      expect(result).toEqual(content)
    })
})

it.only('should decrypt file encrypted by emacs', async function () {
  const encryptedContentBase64 = 'jA0EBwMCwNidu1uaCMzL0j0BUe/qVzzFqeGd0jzGTy9xudGDTXPDgy82uf/5iajdLYUSoNnYtwTimW5NUGVbMcRdbyJYj/cB2Ok3HBRe'
  const content = 'hello!'
  const password = '1234'
  const binary = Uint8Array.from(Buffer.from(encryptedContentBase64, 'base64'))
  const decrypted = await crypto.decrypt(binary, password)
  expect(decrypted).toEqual(content)
})
