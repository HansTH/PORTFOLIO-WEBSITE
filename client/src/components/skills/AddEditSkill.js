import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addEditSkill } from '../../redux/actions/profileActions';
import isEmpty from '../../utils/isEmpty';

// Components
import TextfieldInput from '../common/TextfieldInput';

class AddEditSkill extends Component {
  state = {
    title: '',
    skills: '',
    icon: '',
    level: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.item) {
      const skill = nextProps.profile.item;

      const skillsString = skill.skills.join(',');
      skill.id = !isEmpty(skill._id) ? skill._id : '';
      skill.title = !isEmpty(skill.title) ? skill.title : '';
      skill.icon = !isEmpty(skill.icon) ? skill.icon : '';
      skill.skills = skillsString;
      skill.level = !isEmpty(skill.level) ? skill.level : '';

      this.setState({
        id: skill.id,
        title: skill.title,
        icon: skill.icon,
        skills: skill.skills,
        level: skill.level
      });
    }
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const skillData = {
      id: this.state.id,
      title: this.state.title,
      skills: this.state.skills,
      icon: this.state.icon,
      level: this.state.level
    };

    this.props.addEditSkill(skillData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div id='add-skill' className=' my-4'>
        <div className='container'>
          <h1 className='text-center text-primary display-4'>
            Add your skills
          </h1>
          <p className='lead text-center text-color display-1'>
            Add any developer or programming skills
          </p>
          <form onSubmit={this.handleOnSubmit} noValidate>
            <div className='form-group'>
              <div className='my-2'>
                <Link to='/dashboard' className='btn btn-light'>
                  Go Back
                </Link>
              </div>
              <div>
                <span className='text-color'>* is required</span>
              </div>
              <TextfieldInput
                placeholder='*Skill Title'
                name='title'
                value={this.state.title}
                errors={errors.title}
                onChange={this.handleOnChange}
              />
              <TextfieldInput
                placeholder='*Your skills'
                name='skills'
                value={this.state.skills}
                errors={errors.skills}
                onChange={this.handleOnChange}
                info='Please use comma separated values (eg. HTML, CSS, PHP).'
              />
              <TextfieldInput
                placeholder='*Skill level'
                name='level'
                value={this.state.level}
                errors={errors.level}
                onChange={this.handleOnChange}
                info='Give your skill a number between 0 and 10'
              />
              <TextfieldInput
                placeholder='*Icon URL'
                name='icon'
                value={this.state.icon}
                errors={errors.icon}
                onChange={this.handleOnChange}
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

AddEditSkill.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEditSkill: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addEditSkill }
)(withRouter(AddEditSkill));
