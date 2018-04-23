import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../actions'

class UserLoader extends Component {
  componentWillMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.props.getCurrentUser(token)
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default connect(({}) => ({}), { getCurrentUser })(UserLoader)

