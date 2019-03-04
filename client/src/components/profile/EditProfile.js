import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProfile,
  getUserProfile
} from '../../redux/actions/profileActions';
import isEmpty from '../../utils/isEmpty';

// Common input components
import TextfieldInput from '../common/TextfieldInput';
import TextareaInput from '../common/TextareaInput';

class EditProfile extends Component {
  state = {
    fullname: '',
    jobtitle: '',
    bio: '',
    skills: '',
    github: '',
    mobile: '',
    errors: {}
  };

  componentDidMount() {
    this.props.getUserProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // set skills back to a string
      const skillsString = profile.skills.join(',');

      // check if profile field exist
      profile.fullname = !isEmpty(profile.fullname) ? profile.fullname : '';
      profile.jobtitle = !isEmpty(profile.jobtitle) ? profile.jobtitle : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.github = !isEmpty(profile.github) ? profile.github : '';
      profile.mobile = !isEmpty(profile.mobile) ? profile.mobile : '';

      // Set component input fields
      this.setState({
        fullname: profile.fullname,
        jobtitle: profile.jobtitle,
        bio: profile.bio,
        skills: skillsString,
        github: profile.github,
        mobile: profile.mobile
      });
    }
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const profileData = {
      fullname: this.state.fullname,
      jobtitle: this.state.jobtitle,
      bio: this.state.bio,
      skills: this.state.skills,
      github: this.state.github,
      mobile: this.state.mobile
    };
    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div id='register' className='my-4'>
        <div className='container'>
          <h1 className='text-center text-primary display-4'>
            Edit your Profile
          </h1>
          <p className='lead text-center text-color display-1'>
            Let's get some information to make your profile stand out
          </p>
          <form onSubmit={this.handleOnSubmit} noValidate>
            <div className='form-group'>
              <span className='text-color'>* is requires</span>
              <TextfieldInput
                placeholder='*Your full name'
                name='fullname'
                value={this.state.fullname}
                onChange={this.handleOnChange}
                errors={errors.fullname}
                // info='Please use comma separated values (eg. HTML, CSS, PHP).'
              />
              <TextfieldInput
                placeholder='*Your job title'
                name='jobtitle'
                value={this.state.jobtitle}
                onChange={this.handleOnChange}
                errors={errors.jobtitle}
                // info='Please use cmma separated values (eg. HTML, CSS, PHP).'
              />
              <TextfieldInput
                placeholder='*Your devloper skills'
                name='skills'
                value={this.state.skills}
                onChange={this.handleOnChange}
                errors={errors.skills}
                info='Please use comma separated values (eg. HTML, CSS, PHP).'
              />
              <TextfieldInput
                placeholder='GitHub account'
                name='github'
                value={this.state.github}
                onChange={this.handleOnChange}
                errors={errors.github}
                info='If you want to show your latest repos from GitHub, include your github username'
              />
              <TextfieldInput
                placeholder='mobile number'
                name='mobile'
                value={this.state.mobile}
                onChange={this.handleOnChange}
                errors={errors.mobile}
                info='When people what to call you.'
              />
              <TextareaInput
                placeholder='Bio'
                name='bio'
                value={this.state.bio}
                onChange={this.handleOnChange}
                errors={errors.bio}
                info='Tell us a little about yourself'
              />
              <div className='form-control my-2'>
                <input type='submit' className='btn-light btn-hover' />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getUserProfile }
)(withRouter(EditProfile));
