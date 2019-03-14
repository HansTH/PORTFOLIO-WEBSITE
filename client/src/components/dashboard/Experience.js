import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  deleteExperience,
  getExperienceItem
} from '../../redux/actions/profileActions';
import Moment from 'react-moment';

class Experience extends Component {
  handleDeleteExperience = id => {
    console.log(id);
    this.props.deleteExperience(id);
  };

  handleEditExperience = id => {
    this.props.getExperienceItem(id);
  };

  render() {
    const { experience } = this.props;

    const experienceContent =
      experience &&
      experience
        .sort((a, b) => (a.companyStart < b.companyStart ? 1 : -1))
        .map(exp => (
          <tr key={exp._id}>
            <td>{exp.companyName}</td>
            <td>{exp.companyJobTitle}</td>
            <td>
              <Moment format='MM/YYYY'>{exp.companyStart}</Moment> -{' '}
              {exp.companyCurrent ? (
                ' NU'
              ) : (
                <Moment format='MM/YYYY'>{exp.companyEnd}</Moment>
              )}
            </td>
            <td>
              <Link
                to={'/add-edit-experience'}
                className='btn-light btn-small'
                onClick={() => this.handleEditExperience(exp._id)}>
                Edit
              </Link>
              <span style={{ margin: '0 0.5rem' }} />
              <button
                type='button'
                className='btn-primary btn-small'
                onClick={() => this.handleDeleteExperience(exp._id)}>
                Delete
              </button>
            </td>
          </tr>
        ));

    return (
      <div className='container'>
        <h4 className='my-1 text-center text-color display-2'>Experience</h4>
        <div className='skill-container'>
          {experienceContent && experienceContent.length === 0 ? (
            <p className='text-color display-1'>
              Add your developer or programming skills.
            </p>
          ) : (
            <table className='table-group text-color'>
              <thead>
                <tr className='text-bold text-uppercase'>
                  <th>Bedrijf</th>
                  <th>Postitie</th>
                  <th>Jaar</th>
                  <th />
                </tr>
              </thead>
              <tbody>{experienceContent}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteExperience, getExperienceItem }
)(Experience);
