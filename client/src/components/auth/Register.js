import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';

// common components
import TextfieldInput from '../common/TextfieldInput';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

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

    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { name, email, password, password2, errors } = this.state;
    return (
      <div id='register' className='my-4'>
        <div className='container'>
          <h1 className='text-center text-primary display-4'>Sign In</h1>
          <p className='lead text-center text-color display-1'>
            Create your account
          </p>
          <form onSubmit={this.handleOnSubmit} noValidate>
            <div className='form-group'>
              <span className='text-color'>* is requires</span>
              <TextfieldInput
                type='text'
                placeholder='* Name'
                name='name'
                value={name}
                onChange={this.handleOnChange}
                errors={errors.name}
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
