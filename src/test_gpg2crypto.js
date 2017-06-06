c = require('./gpg2crypto')
let passcode = "123", content = "hello cruel world"
console.log(c.decrypt(c.encrypt(content, passcode), passcode) === content)
