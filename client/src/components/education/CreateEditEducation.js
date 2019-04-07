import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEditEducation } from '../../redux/actions/profileActions';
import moment from 'moment';

// Common input components
import TextfieldInput from '../common/TextfieldInput';
import TextareaInput from '../common/TextareaInput';
import isEmpty from '../../utils/isEmpty';

class CreateEditEducation extends Component {
  state = {
    id: '',
    eduSchool: '',
    eduTitle: '',
    eduStart: '',
    eduCurrent: false,
    eduEnd: '',
    eduInfo: '',
    isDisabled: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });

    if (nextProps.profile.item) {
      const edu = nextProps.profile.item;
      edu._id = !isEmpty(edu._id) ? edu._id : '';
      edu.eduSchool = !isEmpty(edu.eduSchool) ? edu.eduSchool : '';
      edu.eduTitle = !isEmpty(edu.eduTitle) ? edu.eduTitle : '';
      edu.eduStart = !isEmpty(edu.eduStart) ? edu.eduStart : '';
      edu.eduEnd = !isEmpty(edu.eduEnd) ? edu.eduEnd : '';
      edu.eduCurrent = !isEmpty(edu.eduCurrent) ? edu.eduCurrent : '';
      edu.eduInfo = !isEmpty(edu.eduInfo) ? edu.eduInfo : '';
      console.log(edu);

      this.setState({
        id: edu._id,
        eduSchool: edu.eduSchool,
        eduTitle: edu.eduTitle,
        eduStart: edu.eduStart,
        eduCurrent: edu.eduCurrent,
        eduEnd: edu.eduEnd,
        eduInfo: edu.eduInfo,
        isDisabled: edu.eduCurrent
      });
    }
  }

  handleOnCheck = () => {
    this.setState({
      isDisabled: !this.state.isDisabled,
      eduCurrent: !this.state.eduCurrent
    });
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const educationData = {
      id: this.state.id,
      eduSchool: this.state.eduSchool,
      eduTitle: this.state.eduTitle,
      eduStart: this.state.eduStart,
      eduCurrent: this.state.eduCurrent,
      eduEnd: this.state.eduEnd,
      eduInfo: this.state.eduInfo
    };
    this.props.createEditEducation(educationData, this.props.history);
    console.log(educationData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div id='education' className='my-4'>
        <div className='container'>
          <h1 className='text-center text-primary display-4'>
            Add your Education
          </h1>
          <p className='lead text-center text-color display-1'>
            Add your education that you have had in the past
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
                placeholder='*School name'
                name='eduSchool'
                value={this.state.eduSchool}
                onChange={this.handleOnChange}
                errors={errors.eduSchool}
              />
              <TextfieldInput
                placeholder='*The title of the education'
                name='eduTitle'
                value={this.state.eduTitle}
                onChange={this.handleOnChange}
                errors={errors.eduTitle}
              />
              <TextfieldInput
                type='date'
                name='eduStart'
                value={moment(this.state.eduStart, 'YYYY-MM-DD').format(
                  'YYYY-MM-DD'
                )}
                onChange={this.handleOnChange}
                errors={errors.eduStart}
                info='The start of the Education'
              />
              <span className='my-1'>
                <input
                  type='checkbox'
                  name='eduCurrent'
                  id='eduCurrent'
                  onChange={this.handleOnCheck}
                  value={this.state.eduCurrent}
                  checked={this.state.isDisabled}
                />
                <label className='text-color'> Current Education?</label>
              </span>
              <TextfieldInput
                type='date'
                name='eduEnd'
                value={
                  this.state.eduEnd !== ''
                    ? moment(this.state.eduEnd, 'YYYY-MM-DD').format(
                        'YYYY-MM-DD'
                      )
                    : ''
                }
                onChange={this.handleOnChange}
                errors={errors.eduEnd}
                disabled={this.state.isDisabled ? 'disabled' : ''}
                info='When you finished the education'
              />
              <TextareaInput
                placeholder='Education description'
                name='eduInfo'
                value={this.state.eduInfo}
                onChange={this.handleOnChange}
                errors={errors.eduInfo}
                info='Tell us something about the education'
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

CreateEditEducation.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  createEditEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createEditEducation }
)(CreateEditEducation);
