import React, {Component} from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import PropTypes from 'prop-types';
import ReactDom, { Router, Route, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import rootReducer from './reducers'
import LandingPage from './views/LandingPage/landingPage'
import Header from './views/Header/Header'

const store = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default class ReactRouter extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    const landingPageComponent = (props, state, params) =>
      <LandingPage />

    return (
      <Provider store={store}>
        <div>
          <Header />
          <Router history={browserHistory}>
            <Route path="*" component={landingPageComponent} />
          </Router>
        </div>
      </Provider>
    )
  }
}
