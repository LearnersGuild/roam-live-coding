import React from 'react'
import { Link } from 'react-router-dom'

export default function (InnerComponent, userLoggedIn) {
    if(userLoggedIn) {
      return <InnerComponent />
    } else {
      return <div>
        <div><Link to="/sign-in">Sign in</Link></div>
        or
        <div><Link to="/sign-up">Sign up</Link></div>
      </div>
  }
}