/* globals localStorage */

export default (state, action) => {
  if (action.type === 'DROPBOX_SET_AUTH_URL') {
    return Object.assign({}, state, {authUrl: action.url})
  }

  if (action.type === 'DROPBOX_SET_SETTINGS') {
    const newSettings = Object.assign({}, state.settings, {[action.name]: action.value})
    localStorage.dropboxSettings = JSON.stringify(newSettings)
    return Object.assign({}, state, {settings: newSettings})
  }

  if (action.type === 'DROPBOX_DATA_UPLOADED') {
    return Object.assign({}, state, {
      needsUpload: false
    })
  }

  if (state === undefined) {
    const initialState = {
      settings: {
        accessKey: null,
        dropboxOn: null
      },
      authUrl: null
    }
    if (localStorage.dropboxSettings) {
      initialState.settings = JSON.parse(localStorage.dropboxSettings)
    }
    return initialState
  }

  return state
}
