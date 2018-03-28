import React, {Component}  from 'react';
import PropTypes from 'prop-types';

export default class HelloWorld extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
      </div>
    )
  }
}
