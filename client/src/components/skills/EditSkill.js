import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addEditSkill } from '../../redux/actions/profileActions';
import isEmpty from '../../utils/isEmpty';

// Components
import TextfieldInput from '../common/TextfieldInput';

class EditSkill extends Component {
  state = {
    id: '',
    title: '',
    skills: '',
    icon: '',
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

      this.setState({
        id: skill.id,
        title: skill.title,
        icon: skill.icon,
        skills: skill.skills
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
      icon: this.state.icon
    };

    this.props.addEditSkill(skillData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div id='add-skill' className=' my-4'>
        <div className='container'>
          <h1 className='text-center text-primary display-4'>
            Edit your skill
          </h1>
          <p className='lead text-center text-color display-1'>
            Edit your developer or programming skill
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

EditSkill.propTypes = {
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
)(withRouter(EditSkill));
