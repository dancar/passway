const fs = require('fs')
const execFileSync = require('child_process').execFileSync

const GPG_COMMAND = 'gpg'
exports.decrypt = (contentAsArmor, passphrase) => {
  const TEMP_FILE = '/tmp/cryptotmpfile'
  fs.writeFileSync(TEMP_FILE, contentAsArmor, {encoding: null})
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

  return execFileSync(GPG_COMMAND, args, options)
}

exports.encrypt = (content, passphrase) => {
  const args = [
    '--batch',
    '--armor',
    '--passphrase',
    passphrase,
    '--symmetric'
  ]

  const options = {
    input: content,
    encoding: 'utf-8'
  }

  return execFileSync(GPG_COMMAND, args, options)
}
