import { combineReducers } from 'redux'

const fakeReducer = (state='', action) => {
  return state
}

const rootReducer = combineReducers({
  fakeReducer,
})

export default rootReducer