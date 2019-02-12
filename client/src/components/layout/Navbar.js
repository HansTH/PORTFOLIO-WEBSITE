import React, { Component } from 'react';

// import '../../styles';

class Navbar extends Component {
  render() {
    return (
      <div className='nav-container nav-container-sticky'>
        <nav id='navbar'>
          <h1 className='logo text-primary'>Hans ter Horst</h1>
          <ul>
            <li>
              <a className='text-color btn-hover' href='#home'>
                Home
              </a>
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
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
