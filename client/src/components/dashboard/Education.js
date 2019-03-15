import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  deleteEducation,
  getEducationItem
} from '../../redux/actions/profileActions';
import Moment from 'react-moment';

class Education extends Component {
  handleDeleteEducation = id => {
    console.log(id);
    this.props.deleteEducation(id);
  };

  handleEditEducation = id => {
    this.props.getEducationItem(id);
  };

  render() {
    const { education } = this.props;

    const educationContent =
      education &&
      education
        .sort((a, b) => (a.eduStart < b.eduStart ? 1 : -1))
        .map(edu => (
          <tr key={edu._id}>
            <td>{edu.eduSchool}</td>
            <td>{edu.eduTitle}</td>
            <td>
              <Moment format='MM/YYYY'>{edu.eduStart}</Moment> -{' '}
              {edu.eduCurrent ? (
                ' NU'
              ) : (
                <Moment format='MM/YYYY'>{edu.eduEnd}</Moment>
              )}
            </td>
            <td>
              <Link
                to={'/add-edit-education'}
                className='btn-light btn-small'
                onClick={() => this.handleEditEducation(edu._id)}>
                Edit
              </Link>
              <span style={{ margin: '0 0.5rem' }} />
              <button
                type='button'
                className='btn-primary btn-small'
                onClick={() => this.handleDeleteEducation(edu._id)}>
                Delete
              </button>
            </td>
          </tr>
        ));

    return (
      <div className='container'>
        <h4 className='my-1 text-center text-color display-2'>Education</h4>
        <div className='skill-container'>
          {educationContent && educationContent.length === 0 ? (
            <p className='text-color display-1'>
              Add your education or cources.
            </p>
          ) : (
            <table className='table-group text-color'>
              <thead>
                <tr className='text-bold text-uppercase'>
                  <th>School</th>
                  <th>Opleiding</th>
                  <th>Jaar</th>
                  <th />
                </tr>
              </thead>
              <tbody>{educationContent}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  getEducationItem: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation, getEducationItem }
)(Education);
