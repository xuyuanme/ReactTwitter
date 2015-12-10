import {Map} from 'immutable'

const defaultState = new Map()

export default function reducer(state = defaultState, action) {
  console.log('reducer get action ' + action.type + ' with state:')
  console.log(state)
  var newState
  switch(action.type) {
    case 'RECEIVE_PROFILE':
      newState = defaultState.set('profile', action.profile)
      console.log('return new state:')
      console.log(newState)
      return newState
    case 'RECEIVE_OAUTH_TOKEN':
    case 'RECEIVE_ACCESS_TOKEN':
      newState = defaultState.set('redirect', action.redirect)
      console.log('return new state:')
      console.log(newState)
      return newState
    case 'RECEIVE_ERROR':
      newState = defaultState.set('error', action.error)
      console.log('return new state:')
      console.log(newState)
      return newState
    default:
      return state
  }
}
