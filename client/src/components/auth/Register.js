import React, { Component } from 'react';

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
    console.log(newUser);
  };

  render() {
    const { name, email, password, password2 } = this.state;
    return (
      <div id='register' className='my-4'>
        <div className='container'>
          <h1 className='text-center text-primary display-4'>Sign In</h1>
          <p className='lead text-center text-color display-1'>
            Create your account
          </p>
          <form onSubmit={this.handleOnSubmit}>
            <div className='form-group'>
              <span className='text-color'>* is requires</span>
              <div className='form-control'>
                <input
                  type='text'
                  placeholder='* Name'
                  name='name'
                  value={name}
                  onChange={this.handleOnChange}
                />
                <span className='form-error'>This field is required.</span>
              </div>
              <div className='form-control'>
                <input
                  type='email'
                  placeholder='* E-mail'
                  name='email'
                  value={email}
                  onChange={this.handleOnChange}
                />
                <span className='form-error'>This field is required.</span>
              </div>
              <div className='form-control'>
                <input
                  type='password'
                  placeholder='* Password'
                  name='password'
                  value={password}
                  onChange={this.handleOnChange}
                />
                <span className='form-error'>This field is required.</span>
              </div>
              <div className='form-control'>
                <input
                  type='password'
                  placeholder='* Confirm password'
                  name='password2'
                  value={password2}
                  onChange={this.handleOnChange}
                />
                <span className='form-error'>This field is required.</span>
              </div>
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
