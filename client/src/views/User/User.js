import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOutUser } from '../../actions'

class User extends Component {
  render() {
    console.log('props', this.props)
    if (this.props.auth.authenticated) {
      return (
        <div>
          <div>Showing Info for User ID {this.props.auth.user.id}</div>
          <div>User is logged in!</div>
          <button onClick={this.props.signOutUser}>Sign Out</button>
        </div>
      )
    } else {
      return (
        <div>
          <div><Link to="/sign-in">Sign in</Link></div>
          or
          <div><Link to="/sign-up">Sign up</Link></div>
        </div>
      )
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { signOutUser })(User)

