import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {
  render() {
    return (
      <div>
        <div>Showing Info for User ID {this.props.match.params.id}</div>
        <div>User is logged in: {this.props.auth.authenticated}</div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps)(User)

