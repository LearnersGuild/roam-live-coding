import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import PropTypes from 'prop-types';
import ReactDom, { Router, Route } from 'react-router-dom'
import browserHistory from './history'
import thunk from 'redux-thunk'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import rootReducer from './reducers'
import UserLoader from './components/UserLoader'
import LandingPage from './views/LandingPage/landingPage'
import Header from './views/Header/Header'
import User from './views/User/User'
import SignIn from './views/SignIn/SignIn'
import SignUp from './views/SignUp/SignUp'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
)

export default class ReactRouter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const LandingPageComponent = (props, state, params) => <LandingPage />
    const UserComponent = (props, state, params) => <User />

    return (
      <Provider store={store}>
        <UserLoader>
          <Header />
          <Router history={browserHistory}>
            <div>
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/user" component={UserComponent} />
              <Route exact path="/" component={LandingPageComponent} />
            </div>
          </Router>
        </UserLoader>
      </Provider>
    )
  }
}
