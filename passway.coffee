class OpenPgpCrypto
  init: (privateKeyRaw, passphraseFn) ->
    @privateKeyRaw = privateKeyRaw
    @passphraseFn = passphraseFn

  encrypt: (plaintext, cb) ->
    @getPublicKey (publicKey) =>
      cyphertext = openpgp.encryptMessage([publicKey], plaintext)
      cb(cyphertext)

  decrypt: (cyphertext, cb) ->
    @getPrivateKey (privateKey) =>
      plaintext = openpgp.decryptMessage(privateKey, openpgp.message.readArmored(cyphertext))
      cb(plaintext)

  getPrivateKey: (cb) ->
    @passphraseFn (passphrase) =>
      privateKey = openpgp.key.readArmored(@privateKeyRaw).keys[0]
      privateKey.decrypt(passphrase)
      cb(privateKey)

  getPublicKey: (cb) ->
    @getPrivateKey (privateKey) ->
      cb(privateKey.toPublic())

class DropboxPersistence
  CONTENT_FILE: "content"
  APP_KEY: "0t4kvtwfdndqnbv"

  constructor: () ->
    @client = new Dropbox.Client
      key: @APP_KEY

  init: (successCB) ->
    @client.authenticate (error) =>
      return showError(error) if (error)
      @log "Dropbox authentication successful"
      successCB()

  read_content: (cb) ->
    @client.readFile @CONTENT_FILE, (error, content) =>
      return @showError(error) if error
      cb(content)

  write_content: (content, cb) ->
    @client.writeFile @CONTENT_FILE, content, (error, stat) =>
      return @showError(error) if error
      @log "Content successfully saved to Dropbox (revision #{stat.versionTag})"
      cb()

  showError: (error) ->
    console.error(error)

  log: (msg) ->
    console.log(msg)

class PasswordList
  constructor: (json) ->
    list = []
    try
      list = JSON.parse(json)
    catch e
      console.error "Invalid json: #{json}"



class Passway
  constructor: (@persistence, @crypto) ->

  init: ->
    $("#privateKeyFile").change @loadPrivateKeyFile.bind(@)

    $("#save").click =>
      plaintext = $("#content").val()
      @crypto.encrypt plaintext, (cyphertext) =>
        console.log('passway.coffee\\ 67: cyphertext:', cyphertext);
        @persistence.write_content(cyphertext)

    @privateKeyForm = $("#private-key-form")
    @passphraseForm = $("#passphrase-form")
    @passphraseElem = $("#passphrase")

    @contentList = $("#content-list")

    @passphraseForm.submit(@onPassphrase.bind(@))
    @passphraseForm.hide()

    @persistence.init () =>
      @persistenceReady = true
      if @cryptoReady
        @loadContent()

  loadPrivateKeyFile: () ->
    fr = new FileReader()
    fr.onload = () =>
      privateKeyRaw = fr.result
      @privateKeyForm.hide()
      @crypto.init(privateKeyRaw, @getPassphrase.bind(@))

      @cryptoReady = true
      if @persistenceReady
        @loadContent()
    fr.readAsText(privateKeyFile.files[0])

  getPassphrase: (cb) ->
    @passphraseCb = cb
    @passphraseForm.show()
    @passphraseElem.focus()

  onPassphrase: () ->
    @passphraseForm.hide()
    @passphraseCb(@passphraseElem.val())

  loadContent: () ->
    @persistence.read_content (cyphertext_content) =>
      @crypto.decrypt cyphertext_content, (plaintext) =>
        $("#content").val(plaintext)
        @contentList.show()


persistaece = new DropboxPersistence()
crypto = new OpenPgpCrypto()
new Passway(persistaece, crypto).init()
