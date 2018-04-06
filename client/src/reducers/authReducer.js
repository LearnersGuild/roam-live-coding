import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case AUTH_USER: 
      return { ...state, authenticated: true, user: action.payload.user, error: null }
    case UNAUTH_USER:
      return { ...state, authenticated: false, user: null }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    default:
      return { ...state }
  }
}