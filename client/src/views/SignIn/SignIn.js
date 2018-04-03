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
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit())}>
          <Field name="email" type="text" label="Email" required={true} component={renderClarityField} />
          <Field name="password" type="password" label="Password" required={true} component={renderClarityField} />
          <button action="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
        {this.renderAlert()}
      </div>
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