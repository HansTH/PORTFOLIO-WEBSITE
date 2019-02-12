import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <header id='showcase'>
        <div className='showcase-content'>
          <h1 className='l-heading text-primary'>Hans</h1>
          <h1 className='l-heading text-primary'>ter</h1>
          <h1 className='l-heading text-primary'>Horst</h1>
          <p className='lead text-color'>iOS & Web Developer</p>
          <a href='#contact' className='btn-light btn-hover'>
            Login
          </a>
        </div>
      </header>
    );
  }
}

export default Landing;
