import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteSkill, getSkill } from '../../redux/actions/profileActions';

class Skill extends Component {
  handleDeleteSkill = id => {
    this.props.deleteSkill(id);
  };

  handleEditSkill = id => {
    this.props.getSkill(id);
  };

  render() {
    const { skill } = this.props;

    const skillContent =
      skill &&
      skill.map(skill => (
        <div key={skill._id} className='text-center skill-item withBorder-1'>
          <img
            src={skill.icon}
            alt={skill.title}
            style={{ width: '5rem' }}
            className='my-1'
          />
          <h4 className='text-color lead'>{skill.title}</h4>
          <ul>
            {skill.skills.map(skill => (
              <div key={skill} className='text-color display-1'>
                <li>{skill}</li>
              </div>
            ))}
          </ul>
          <Link
            to={'/add-edit-skill'}
            className='btn-light btn-small my-1'
            onClick={() => this.handleEditSkill(skill._id)}>
            Edit
          </Link>
          <button
            type='button'
            className='btn-primary btn-small'
            onClick={() => this.handleDeleteSkill(skill._id)}>
            Delete
          </button>
        </div>
      ));

    return (
      <div className='container'>
        <h4 className='my-1 text-center text-color display-2'>Skills</h4>
        <div className='skill-container'>
          {skillContent && skillContent.length === 0 ? (
            <p className='text-color display-1'>
              Add your developer or programming skills.
            </p>
          ) : (
            skillContent
          )}
        </div>
      </div>
    );
  }
}

Skill.propTypes = {
  skill: PropTypes.array.isRequired,
  deleteSkill: PropTypes.func.isRequired,
  getSkill: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteSkill, getSkill }
)(Skill);
