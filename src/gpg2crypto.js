const fs = require('fs')
const execFileSync = require('child_process').execFileSync
const execFile = require('child_process').execFile

exports.decrypt = (contentBuffer, passphrase, callback) => {

  const TEMP_FILE = '/tmp/cryptotmpfile'
  fs.writeFileSync(TEMP_FILE, contentBuffer, {encoding: null})
  const args = [
    '--quiet',
    '--batch',
    '--passphrase-fd',
    '0',
    '-d',
    TEMP_FILE
  ]

  const options = {
    input: passphrase,
    encoding: 'utf-8'
  }

  return execFileSync('gpg', args, options)
}


exports.encrypt = (content, passphrase) => {
  const args = [
    '--batch',
    '--passphrase',
    passphrase,
    '--symmetric'
  ]

  const options = {
    input: content
  }

  return execFileSync('gpg', args, options)
}
