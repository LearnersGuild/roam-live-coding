import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { signInUser, setAuthError } from '../../actions'

const fields = ['email', 'password']

class SignIn extends Component {
  constructor(props) {
    super(props);

    // Patrick prefers this for efficiency
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount() {
    // clear any errors
    this.props.setAuthError(null)

  }

  handleFormSubmit({ email, password }) {
    // log user in
    this.props.signInUser({ email, password })
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="error-alert">
          {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit()))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

const formOptions = {
  form: 'signin',
  fields,
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const SignInForm = reduxForm(formOptions)(SignIn)
export default connect(mapStateToProps, { signInUser, setAuthError })(SignInForm)