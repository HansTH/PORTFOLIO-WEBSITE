import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/actions/profileActions';
import Loading from '../common/Loading';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent = {};
    if (profile === null || loading) {
      dashboardContent = <Loading />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h3>DISPLAY PROFILE</h3>;
      } else {
        dashboardContent = (
          <div className='text-center my-4'>
            <h1 className='text-color'>Welcome {user.name}</h1>
            <p className='text-color'>
              You have not yet setup a profile, please add some info
            </p>
            <div className='my-2'>
              <Link to='/create-profile' className='btn-light btn-hover'>
                Create Profile
              </Link>
            </div>
          </div>
        );
      }
    }

    return (
      <div className='dashboard my-4'>
        <div className='container'>
          <h1 className=' text-primary text-center display-4'>Dashboard</h1>
          {dashboardContent}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(Dashboard);
