import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';

// common components
import TextfieldInput from '../common/TextfieldInput';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const { username, email, password, password2 } = this.state;
    const newUser = {
      username,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { username, email, password, password2, errors } = this.state;
    return (
      <div id='register' className='my-4'>
        <div className='container'>
          <h1 className='text-center text-primary display-4'>Sign In</h1>
          {errors.user ? (
            <p className='lead text-center text-primary display-1'>
              {errors.user}
            </p>
          ) : (
            <p className='lead text-center text-color display-1'>
              Create your account
            </p>
          )}
          <form onSubmit={this.handleOnSubmit} noValidate>
            <div className='form-group'>
              <div className='my-2'>
                <Link to='/' className='btn btn-light'>
                  Go Back
                </Link>
              </div>
              <div />
              <span className='text-color'>* is required</span>
              <TextfieldInput
                type='text'
                placeholder='* Username'
                name='username'
                value={username}
                onChange={this.handleOnChange}
                errors={errors.username}
              />

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

              <TextfieldInput
                type='password'
                placeholder='* Confirm password'
                name='password2'
                value={password2}
                onChange={this.handleOnChange}
                errors={errors.password2}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
