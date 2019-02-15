import React, { Component } from 'react';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const loginUser = {
      email,
      password
    };
    console.log(loginUser);
  };

  render() {
    const { email, password } = this.state;
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

export default Login;
