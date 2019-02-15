import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <header id='showcase'>
        <div className='showcase-content'>
          <h1 className='display-4 text-uppercase text-primary text-bold'>
            Hans
          </h1>
          <h1 className='display-4 text-uppercase text-primary text-bold'>
            ter
          </h1>
          <h1 className='display-4 text-uppercase text-primary text-bold'>
            Horst
          </h1>
          <p className='lead text-color'>iOS & Web Developer</p>
          <div>
            <Link to={'/login'} className='btn-light btn-hover'>
              Login
            </Link>
            <Link to={'/register'} className='btn-light btn-hover'>
              Register
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Landing;
