import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addSkill } from '../../redux/actions/profileActions';

// Components
import TextfieldInput from '../common/TextfieldInput';

class AddSkill extends Component {
  state = {
    title: '',
    skills: '',
    icon: '',
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

    const skillData = {
      title: this.state.title,
      skills: this.state.skills,
      icon: this.state.icon
    };

    this.props.addSkill(skillData, this.props.history);
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
            Add any developer/programming skills
          </p>
          <form onSubmit={this.handleOnSubmit} noValidate>
            <div className='form-group'>
              <div className='my-2'>
                <Link to='/dashboard' className='btn btn-light'>
                  Go Back
                </Link>
              </div>
              <div>
                <span className='text-color'>* is requires</span>
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

AddSkill.propTypes = {
  errors: PropTypes.object.isRequired,
  addSkill: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addSkill }
)(withRouter(AddSkill));
