import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
    contactEmail: '',
    contactNumber: '',
    contactTitle: '',
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
      console.log(profile);
      // set skills back to a string
      const skillsString = profile.skills.join(',');

      // check if profile field exist
      profile.fullname = !isEmpty(profile.fullname) ? profile.fullname : '';
      profile.jobtitle = !isEmpty(profile.jobtitle) ? profile.jobtitle : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.github = !isEmpty(profile.github) ? profile.github : '';
      profile.contactNumber = !isEmpty(profile.contactNumber)
        ? profile.contactNumber
        : '';
      profile.contactEmail = !isEmpty(profile.contactEmail)
        ? profile.contactEmail
        : '';
      profile.contactTitle = !isEmpty(profile.contactTitle)
        ? profile.contactTitle
        : '';

      // Set component input fields
      this.setState({
        fullname: profile.fullname,
        jobtitle: profile.jobtitle,
        bio: profile.bio,
        skills: skillsString,
        github: profile.github,
        contactNumber: profile.contactNumber,
        contactEmail: profile.contactEmail,
        contactTitle: profile.contactTitle
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
      contactTitle: this.state.contactTitle,
      contactNumber: this.state.contactNumber,
      contactEmail: this.state.contactEmail
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
            Edit some information to make your profile better
          </p>
          <form onSubmit={this.handleOnSubmit} noValidate>
            <div className='form-group'>
              <div className='my-2'>
                <Link to='/dashboard' className='btn btn-light'>
                  Go Back
                </Link>
              </div>
              <div />
              <span className='text-color'>* is required</span>
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
                placeholder='*Your developer skills'
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
                placeholder='Your mobile number'
                name='contactNumber'
                value={this.state.contactNumber}
                onChange={this.handleOnChange}
                errors={errors.contactNumber}
                info='When people want to call you.'
              />
              <TextfieldInput
                placeholder='Your email'
                name='contactEmail'
                value={this.state.contactEmail}
                onChange={this.handleOnChange}
                errors={errors.contactEmail}
                info='When people want to sent you a message.'
              />
              <TextfieldInput
                placeholder='Contact title'
                name='contactTitle'
                value={this.state.contactTitle}
                onChange={this.handleOnChange}
                errors={errors.contactTitle}
                info='Some highlight text for the title'
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