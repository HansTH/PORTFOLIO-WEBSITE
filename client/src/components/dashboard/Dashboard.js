import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getUserProfile,
  deleteAccount
} from '../../redux/actions/profileActions';
import Loading from '../common/Loading';
import DashboardAction from './DashboardActions';
import Skills from './Skills';
import Portfolio from './Portfolio';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { deleteAccount } = this.props;
    let dashboardContent = {};
    if (profile === null || loading) {
      dashboardContent = <Loading />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className='container'>
            <h1 className='text-center text-color my-1'>
              Welcome {profile.fullname}
            </h1>
            <div>
              <DashboardAction />
              <Portfolio portfolio={profile.portfolio} />
              <Skills skill={profile.skill} />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
            </div>
            <div className='text-center my-4'>
              <button
                className='btn btn-primary'
                onClick={() => {
                  deleteAccount();
                }}>
                Delete my account
              </button>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div className='text-center my-4'>
            <h1 className='text-color'>Welcome {user.name}</h1>
            <p className='text-color'>
              You have not yet setup a profile, please add some info
            </p>
            <div className='my-2'>
              <Link to='/create-profile' className='btn-light btn btn-hover'>
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
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserProfile, deleteAccount }
)(withRouter(Dashboard));
