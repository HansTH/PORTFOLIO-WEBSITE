import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

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

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
