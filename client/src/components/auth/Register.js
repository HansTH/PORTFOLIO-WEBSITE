import React, { Component } from 'react';
import axios from 'axios';

import TextfieldInput from '../common/TextfieldInput';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

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

    axios
      .post('/api/user/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
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

export default Register;
