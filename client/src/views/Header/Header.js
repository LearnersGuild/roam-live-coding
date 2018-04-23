import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../../actions'

class Header extends Component {
  componentWillMount() {
    console.log('Inside componentWillMount!!!')
    this.props.getCurrentUser()
  }

  render() {
    return (
      <div>Traveling Very Slowly</div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { getCurrentUser })(Header)

