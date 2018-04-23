import axios from 'axios'
import browserHistory from '../history'

// TODO: update cors
const ROOT_URL = 'http://localhost:3030'

import { 
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER,
} from './actionTypes'

const authHandler = (response, dispatch) => {
  console.log('Response:', response)

  // if request is good...
  // - update state to indicate user is authenticated
  dispatch({ type: AUTH_USER, payload: { user: response.data.user } })

  // - save the JWT in browser "local storage" 
  // (available even after navigating away and coming back)
  localStorage.setItem('token', response.data.token)

  // - redirect to the route 
  browserHistory.push(`/user`)
}

const signInUser = ({ email, password }) => {
  // because we have redux-thunk middleware,
  // instead of returning an object, we can return a function
  // redux-thunk gives arbitrary access to dispatch method
  return function(dispatch) {
    console.log('Inside function call for signInUser')
    // submit email/password to api server
    axios.post(`${ROOT_URL}/auth/sign-in`, { email, password })
      .then((response) => authHandler(response, dispatch))
      .catch((error) => {
        // if request is bad...
        // - Show an error to the user
        dispatch(setAuthError('Bad login info'))
      })
  }
}

const getCurrentUser = () => {
  console.log("Inside getCurrentUser")
  const token = localStorage.getItem('token')

  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${ROOT_URL}/auth/current-user`,
      headers: { 'authorization': token },
    }).then((response) => {
      console.log("Response to /auth/current-user request:", response)
      dispatch({
        type: AUTH_USER,
        payload: { user: response.data.sub }
      })
    }).catch((error) => {
      dispatch(setAuthError('Bad token'))
    })
  }
}

const signUpUser = ({ email, primary_city, password }) => {
  return function(dispatch) {
    // submit email/password to api server
    axios.post(`${ROOT_URL}/auth/sign-up`, { email, primary_city, password })
      .then((response) => authHandler(response, dispatch))
      .catch((error) => {
        // if request is bad...
        // - Show an error to the user
        console.error(error)
        dispatch(setAuthError('Bad login info'))
      })
  }
}

const signOutUser = () => {
  localStorage.removeItem('token')
  return {
    type: UNAUTH_USER
  }
}

const setAuthError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error,
  }
} 

module.exports = {
  signInUser,
  signUpUser,
  signOutUser,
  getCurrentUser,
  setAuthError,
}