import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className='nav-container nav-container-sticky'>
        <nav id='navbar'>
          <h1 className='logo text-primary'>Hans ter Horst</h1>
          <ul>
            <li>
              <Link to={'/'} className='text-color btn-hover'>
                Home
              </Link>
            </li>
            <li>
              <a className='text-color btn-hover' href='#what'>
                What
              </a>
            </li>
            <li>
              <a className='text-color btn-hover' href='#who'>
                Who
              </a>
            </li>
            <li>
              <a className='text-color btn-hover' href='#contact'>
                Contact
              </a>
            </li>
            <li>
              <Link to={'/login'} className='text-color btn-hover'>
                Login
              </Link>
            </li>
            <li>
              <Link to={'/register'} className='text-color btn-hover'>
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
