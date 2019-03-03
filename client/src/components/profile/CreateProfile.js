import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextfieldInput from '../common/TextfieldInput';
import TextareaInput from '../common/TextareaInput';

class CreateProfile extends Component {
  state = {
    bio: '',
    skills: '',
    github: '',
    mobiel: '',
    errors: {}
  };
  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const profileData = {
      bio: this.state.bio
    };
    console.log(profileData);
  };

  render() {
    const { value, errors } = this.state;
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
                placeholder='Your devloper skills'
                name='skills'
                value={value}
                onChange={this.handleOnChange}
                errors={errors.skills}
                info='What are your best skills.'
              />
              <TextfieldInput
                placeholder='GitHub account'
                name='github'
                value={value}
                onChange={this.handleOnChange}
                errors={errors.github}
                info='Tell us a little about yourself'
              />
              <TextfieldInput
                placeholder='Mobiel number'
                name='mobiel'
                value={value}
                onChange={this.handleOnChange}
                errors={errors.mobiel}
                info='Your mobile number when people what to call you.'
              />
              <TextareaInput
                placeholder='Bio'
                name='bio'
                value={value}
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(CreateProfile));
