import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkUserProfile } from '../../redux/actions/profileActions';

// Redux
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    this.props.checkUserProfile();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    // const { user } = this.props.user;
    const { profile, loading } = this.props.profile;

    let landingContent = {};

    if (profile === null || loading) {
      landingContent = <h2>loading...</h2>;
    } else {
      if (profile) {
        landingContent = (
          <div>
            <h1 className='display-4 text-uppercase text-primary text-bold'>
              Welcome
            </h1>
            <p className='lead text-color'>
              You don't have a account, please register to create on.
            </p>
            <div>
              <Link to={'/register'} className='btn btn-light btn-hover'>
                Register
              </Link>
            </div>
          </div>
        );
      }
      if (Object.keys(profile).length > 0 && profile[0]) {
        landingContent = profile.map(item => (
          <div key={item._id}>
            {item.fullname.split(' ').map(item => (
              <h1
                key={item}
                className='display-4 text-uppercase text-primary text-bold'>
                {item}
              </h1>
            ))}
            <p className='lead text-color'>{item.jobtitle}</p>
            <div>
              <Link to={'/login'} className='btn btn-light btn-hover'>
                Login
              </Link>
            </div>
          </div>
        ));
      }
      if (profile.profile) {
        console.log(profile.profile.length);
        landingContent = (
          <div>
            <h1 className='display-4 text-uppercase text-primary text-bold'>
              Welcome
            </h1>
            <h1 className=' text-uppercase text-color text-bold'>
              {profile.profile}
            </h1>

            <p className='lead text-color'>
              You have not yet setup a profile, please login to create one.
            </p>
            <div>
              <Link to={'/login'} className='btn-light btn-hover'>
                Login
              </Link>
            </div>
          </div>
        );
      }
    }

    return (
      <header id='landing'>
        <div className='landing-content'>{landingContent}</div>
      </header>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
  checkUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { checkUserProfile }
)(Landing);
