import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Input from '../../components/Input'
import { signUpUser, setAuthError } from '../../actions'

const fields = ['email', 'password', 'primary_city', 'passwordConfirm']

class SignUp extends Component {
  constructor(props) {
    super(props);

    // Patrick prefers this for efficiency
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount() {
    // clear any errors
    this.props.setAuthError(null)

  }

  handleFormSubmit({ email, primary_city, password }) {
    console.log('handleFormSubmit args', [email, primary_city, password].join('\n'))

    // log user in
    this.props.signUpUser({ email, primary_city, password })
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

    const { handleSubmit, fields : { email, primary_city, password }} = this.props;
    // or, put another way: 
    // const { handleSubmit, fields } = this.props;
    // const { email, password } = fields;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field name="email" label="Email" type="email" required="true" component={Input} />
        <Field name="primary_city" label="Primary City" type="text" required="true" component={Input} />
        <Field name="password" label="Password" type="password" required="true" component={Input} />
        <Field name="passwordConfirm" label="Confirm Password" type="password" required="true" component={Input} />
        {this.renderAlert()}
        <button type="submit">Sign up</button>
      </form>
    )
  }
}

const formOptions = {
  form: 'signUp',
  fields,
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const SignUpForm = reduxForm(formOptions)(SignUp)
export default connect(mapStateToProps, { signUpUser, setAuthError })(SignUpForm)