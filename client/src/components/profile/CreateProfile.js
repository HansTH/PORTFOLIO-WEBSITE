import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../redux/actions/profileActions';

// Common input components
import TextfieldInput from '../common/TextfieldInput';
import TextareaInput from '../common/TextareaInput';

class CreateProfile extends Component {
  state = {
    fullname: '',
    jobtitle: '',
    bio: '',
    skills: '',
    github: '',
    mobile: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
    console.log(profileData);
    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div id='register' className='my-4'>
        <div className='container'>
          <h1 className='text-center text-primary display-4'>
            Create your Profile
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

CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
