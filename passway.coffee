privateKeyElem = $("#privateKey")
cyphertextElem = $("#cyphertext")
passphraseElem = $("#passphrase")
contentElem = $("#content")
privateKeyFileElem = $("#privateKeyFile")[0]
publiKeyFileElem = $("#publicKeyFile")[0]
dropboxDiv = $("#dropboxCyphertextDiv")[0]

window.load = ->
  cyphertext = openpgp.message.readArmored(cyphertextElem.val())
  plaintext = openpgp.decryptMessage(getPrivateKey(), cyphertext)
  contentElem.val(plaintext)

window.save = ->
  publicKey = getPrivateKey().toPublic()
  plaintext = contentElem.val()
  cypher = openpgp.encryptMessage([publicKey], plaintext)
  cyphertextElem.val(cypher)

window.getPrivateKey = ->
  privateKey = openpgp.key.readArmored(privateKeyElem.val()).keys[0]
  privateKey.decrypt(passphraseElem.val())
  privateKey

window.loadFile = (fileElem, textAreaElem) ->
  fr = new FileReader()
  fr.onload = ->
    textAreaElem.val(fr.result)
  fr.readAsText(fileElem.files[0])

window.loadPrivateKeyFile = () ->
  loadFile(privateKeyFile, privateKeyElem)

window.loadCyphertextFile = () ->
  loadFile(cyphertextFile, cyphertextElem)

dropboxButton = Dropbox.createChooseButton({
  success: (files) ->
    $.ajax files[0].link,
      success: (data, textStatus, jqXHR) ->
        cyphertextElem.val(data)
  linkType: "direct"
  multiselect: false
})
dropboxDiv.appendChild(dropboxButton);
