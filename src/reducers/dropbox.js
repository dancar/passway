export default (state, action) => {
  if (action.type === 'DROPBOX_SET_AUTH_URL') {
    return Object.assign({}, state, {authUrl: action.url})
  }

  if (action.type === 'DROPBOX_SET_SETTINGS') {
    const newSettings = Object.assign({}, state, action.settings)
    localStorage.dropboxSettings = JSON.stringify(newSettings)

    if (newSettings.dropboxOn && newSettings.dropboxAccessKey) {

    }

    return newSettings
  }

  if (action.type === 'NEW_ENCRYPTED_CONTENT') {
    return Object.assign({}, state, {
      needsUpload: true
    })
  }

  if (action.type === 'DROPBOX_DATA_UPLOADED') {
    return Object.assign({}, state, {
      needsUpload: false
    })
  }

  if (state === undefined) {
    return localStorage.dropboxSettings ?
      JSON.parse(localStorage.dropboxSettings)
      : { authUrl: this.authUrl }
  }

  return state
}
