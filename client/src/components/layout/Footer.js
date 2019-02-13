import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer id='footer' class='bg-dark text-center py-2'>
        <div className='container'>
          <p>Copyright &copy; {new Date().getFullYear()} Hans ter Horst </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
