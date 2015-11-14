var _tOauthAuthorize = 'https://twitter.com/oauth/authorize?oauth_token='
var _apiRequestToken = 'http://xuyuan.me:8483/twitter/requestToken'
var _apiAccessToken = 'http://xuyuan.me:8483/twitter/accessToken?oauth_verifier='
var _apiProfile = 'http://xuyuan.me:8483/twitter/profile'

export function getProfile() {
  console.log('action_creators: getProfile')
  return dispatch => {
    return fetch(_apiProfile, {credentials: 'include'})
      .then(checkStatus)
      .then(response => response.json())
      .then(json => dispatch(receiveProfile(json)))
      .catch(error => dispatch(receiveError(error)))
  }
}

function receiveProfile(json) {
  console.log('action_creators: receiveProfile')
  return {
    type: 'RECEIVE_PROFILE',
    profile: json
  }
}

export function getOauthToken() {
  console.log('action_creators: getOauthToken')
  return dispatch => {
    return fetch(_apiRequestToken, {credentials: 'include'})
      .then(checkStatus)
      .then(response => response.json())
      .then(json => dispatch(receiveOauthToken(json)))
      .catch(error => dispatch(receiveError(error)))
  }
}

function receiveOauthToken(json) {
  console.log('action_creators: receiveOauthToken')
  return {
    type: 'RECEIVE_OAUTH_TOKEN',
    redirect: _tOauthAuthorize + json.oauthRequestToken
  }
}

export function getAccessToken(oauth_verifier) {
  console.log('action_creators: getAccessToken')
  return dispatch => {
    return fetch(_apiAccessToken + oauth_verifier, {credentials: 'include'})
      .then(checkStatus)
      .then(response => dispatch(receiveAccessToken()))
      .catch(error => dispatch(receiveError(error)))
  }
}

function receiveAccessToken() {
  console.log('action_creators: receiveAccessToken')
  var getUrl = window.location
  var baseUrl = getUrl.protocol + '//' + getUrl.host + '/' + getUrl.pathname.split('/')[1]
  return {
    type: 'RECEIVE_ACCESS_TOKEN',
    redirect: baseUrl
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.status = response.status
    error.response = response
    throw error
  }
}

function receiveError(error) {
  console.log('action_creators: receiveError')
  return {
    type: 'RECEIVE_ERROR',
    error: error
  }
}