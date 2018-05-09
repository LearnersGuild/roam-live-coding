import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signOutUser } from '../../actions'
import requireLogin from '../../components/requireLogin'

class User extends Component {
  render() {
    const userInfo = () => {
      return <div>
        <div>Showing Info for User ID {this.props.auth.user.id}</div>
        <div>User is logged in!</div>
        <button onClick={this.props.signOutUser}>Sign Out</button>
      </div>
    }

    return requireLogin(userInfo, this.props.auth.authenticated)
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { signOutUser })(User)

