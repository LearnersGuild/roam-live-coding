import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Input from '../../components/Input'
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
    // console.log('******Props:', this.props)

    const { handleSubmit, fields : { email, password }} = this.props;
    // or, put another way: 
    // const { handleSubmit, fields } = this.props;
    // const { email, password } = fields;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field name="email" label="Email" type="email" required="true" component={Input} />
        <Field name="password" label="Password" type="password" required="true" component={Input} />
        <Field name="frank" label="Frank" type="frank" component={Input} />
        {this.renderAlert()}
        <button action="submit">Sign in</button>
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