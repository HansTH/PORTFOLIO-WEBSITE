import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addPortfolio } from '../../redux/actions/profileActions';

// Common components
import TextfieldInput from '../common/TextfieldInput';
import TextareaInput from '../common/TextareaInput';

class AddPortfolio extends Component {
  state = {
    appTitle: '',
    appInfo: '',
    appCategory: '',
    appScreenshot: '',
    appSkills: '',
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

    const portfolioData = {
      appTitle: this.state.appTitle,
      appInfo: this.state.appInfo,
      appCategory: this.state.appCategory,
      appScreenshot: this.state.appScreenshot,
      appSkills: this.state.appSkills
    };

    this.props.addPortfolio(portfolioData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div id='add-skill' className=' my-4'>
        <div className='container'>
          <h1 className='text-center text-primary display-4'>
            Add to your Portfolio
          </h1>
          <p className='lead text-center text-color display-1'>
            Add your best Work
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
                placeholder='*App Title'
                name='appTitle'
                value={this.state.appTitle}
                errors={errors.appTitle}
                onChange={this.handleOnChange}
              />
              <TextfieldInput
                placeholder='*Category'
                name='appCategory'
                value={this.state.appCategory}
                errors={errors.appCategory}
                onChange={this.handleOnChange}
                info='What kind of app (eg. Web, iOS, Android).'
              />
              <TextfieldInput
                placeholder='*URL location'
                name='appScreenshot'
                value={this.state.appScreenshot}
                errors={errors.appScreenshot}
                onChange={this.handleOnChange}
              />
              <TextfieldInput
                placeholder='*Skills'
                name='appSkills'
                value={this.state.appSkills}
                errors={errors.appSkills}
                onChange={this.handleOnChange}
              />
              <TextareaInput
                placeholder='*Info'
                name='appInfo'
                value={this.state.appInfo}
                onChange={this.handleOnChange}
                errors={errors.appInfo}
                info='Tell us a little about this project'
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

AddPortfolio.propTypes = {
  errors: PropTypes.object.isRequired,
  addPortfolio: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPortfolio }
)(withRouter(AddPortfolio));
