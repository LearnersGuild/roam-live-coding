/*
  Consider this the root level container for your single page app.
  Currently the only route defined in Reaact-Router renders this Component.
*/
import React, {Component}  from 'react';
import PropTypes from 'prop-types';
/*
  The line below imports the Link component from the React-router library.
  I recommend using this over an <a href=...> for changing views of your
  single page app. See this link for more info:
  https://knowbody.github.io/react-router-docs/api/Link.html
*/
import {Link} from 'react-router';
/*
  I recommend one component per file. Import components as seen below.
  This page currently imports and renders only a <div> with our HelloWorld
  component as a child.
*/
import HelloWorld from './helloWorld';

export default class LandingPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <HelloWorld />
      </div>
    )
  }
}
