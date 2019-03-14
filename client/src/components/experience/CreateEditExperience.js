import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEditExperience } from '../../redux/actions/profileActions';

// Common input components
import TextfieldInput from '../common/TextfieldInput';
import TextareaInput from '../common/TextareaInput';

class CreateEditExperience extends Component {
  state = {
    companyName: '',
    companyCity: '',
    companyStart: '',
    companyCurrent: false,
    companyEnd: '',
    companyJobtitel: '',
    companyJobInfo: '',
    isDisabled: false,
      errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }

  handleOnCheck = () => {
    this.setState({
      isDisabled: !this.state.isDisabled,
      companyCurrent: !this.state.companyCurrent
    });
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const experienceData = {
      companyName: this.state.companyName,
      companyCity: this.state.companyCity,
      companyStart: this.state.companyStart,
      companyCurrent: this.state.companyCurrent,
      companyEnd: this.state.companyEnd,
      companyJobTitle: this.state.companyJobTitle,
      companyJobInfo: this.state.companyJobInfo
    };
    this.props.createEditExperience(experienceData, this.props.history);
    console.log(experienceData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div id='experience' className='my-4'>
        <div className='container'>
          <h1 className='text-center text-primary display-4'>
            Add your work Experience
          </h1>
          <p className='lead text-center text-color display-1'>
            Add any job positions that you have had in the past
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
                placeholder='*Company name'
                name='companyName'
                value={this.state.companyName}
                onChange={this.handleOnChange}
                errors={errors.companyName}
              />
              <TextfieldInput
                placeholder='*The city of the company'
                name='companyCity'
                value={this.state.companyCity}
                onChange={this.handleOnChange}
                errors={errors.companyCity}
              />
              <TextfieldInput
                placeholder='*Job title'
                name='companyJobTitle'
                value={this.state.companyJobTitle}
                onChange={this.handleOnChange}
                errors={errors.companyJobTitle}
              />
              <TextfieldInput
                type='date'
                name='companyStart'
                value={this.state.companyStart}
                onChange={this.handleOnChange}
                errors={errors.companyStart}
                info='When you start working'
              />
              <span className='my-1'>
                <input
                  type='checkbox'
                  name='companyCurrent'
                  id='companyCurrent'
                  onChange={this.handleOnCheck}
                  value={this.state.companyCurrent}
                  checked={this.state.isDisabled}
                />
                <label className='text-color'> Current Job?</label>
              </span>
              <TextfieldInput
                type='date'
                name='companyEnd'
                value={this.state.companyEnd}
                onChange={this.handleOnChange}
                errors={errors.companyEnd}
                disabled={this.state.isDisabled ? 'disabled' : ''}
                info='When you leave the company'
              />
              <TextareaInput
                placeholder='Job description'
                name='companyJobInfo'
                value={this.state.companyJobInfo}
                onChange={this.handleOnChange}
                errors={errors.companyJobInfo}
                info='Tell us a little about the job'
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

CreateEditExperience.propTypes = {
  errors: PropTypes.object.isRequired,
  createEditExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createEditExperience }
)(CreateEditExperience);
