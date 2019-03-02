import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../redux/actions/authActions';
import { clearProfile } from '../../redux/actions/profileActions';

// Redux
import { connect } from 'react-redux';

class Navbar extends Component {
  logoutUser = e => {
    e.preventDefault();
    this.props.clearProfile();
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul>
        <li>
          <Link to={'/dashboard'} className='text-color btn-hover'>
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to={'/'}
            className='text-color btn-hover'
            onClick={this.logoutUser}
            style={{ cursor: 'pointer' }}>
            Logout
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
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
      </ul>
    );

    return (
      <div className='nav-container nav-container-sticky'>
        <nav id='navbar'>
          <Link to={'/'} className='logo text-primary'>
            Hans ter Horst
          </Link>
          {isAuthenticated ? authLinks : guestLinks}
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearProfile }
)(withRouter(Navbar));
