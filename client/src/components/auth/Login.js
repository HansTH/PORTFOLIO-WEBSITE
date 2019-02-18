import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

import TextfieldInput from '../common/TextfieldInput';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    this.props.loginUser(user);
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <div id='login' className='my-4'>
        <div className='container'>
          <h1 className='text-center text-primary display-4'>Log In</h1>
          <p className='lead text-center text-color display-1'>
            Sign in to your account
          </p>
          <form onSubmit={this.handleOnSubmit}>
            <div className='form-group'>
              <span className='text-color'>* is requires</span>
              <TextfieldInput
                type='email'
                placeholder='* Email'
                name='email'
                value={email}
                onChange={this.handleOnChange}
                errors={errors.email}
              />

              <TextfieldInput
                type='password'
                placeholder='* Password'
                name='password'
                value={password}
                onChange={this.handleOnChange}
                errors={errors.password}
              />

              <div className='form-control my-2'>
                <input type='submit' className='btn-light btn-hover' />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
