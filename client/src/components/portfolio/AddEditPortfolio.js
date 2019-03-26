import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addEditPortfolio } from '../../redux/actions/profileActions';
import isEmpty from '../../utils/isEmpty';
// Common components
import TextfieldInput from '../common/TextfieldInput';
import TextareaInput from '../common/TextareaInput';

class AddEditPortfolio extends Component {
  state = {
    id: '',
    appTitle: '',
    appInfo: '',
    appCategory: '',
    appScreenshot: '',
    appSkills: '',
    appIcon: '',
    appStore: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.item) {
      const portfolioItem = nextProps.profile.item;

      const appSkillsString = portfolioItem.appSkills.join(',');
      portfolioItem.appSkills = appSkillsString;
      portfolioItem.id = !isEmpty(portfolioItem._id) ? portfolioItem._id : '';
      portfolioItem.appTitle = !isEmpty(portfolioItem.appTitle)
        ? portfolioItem.appTitle
        : '';
      portfolioItem.appInfo = !isEmpty(portfolioItem.appInfo)
        ? portfolioItem.appInfo
        : '';
      portfolioItem.appCategory = !isEmpty(portfolioItem.appCategory)
        ? portfolioItem.appCategory
        : '';
      portfolioItem.appScreenshot = !isEmpty(portfolioItem.appScreenshot)
        ? portfolioItem.appScreenshot
        : '';
      portfolioItem.appIcon = !isEmpty(portfolioItem.appIcon)
        ? portfolioItem.appIcon
        : '';
      portfolioItem.appStore = !isEmpty(portfolioItem.appStore)
        ? portfolioItem.appStore
        : '';

      this.setState({
        id: portfolioItem.id,
        appTitle: portfolioItem.appTitle,
        appInfo: portfolioItem.appInfo,
        appCategory: portfolioItem.appCategory,
        appScreenshot: portfolioItem.appScreenshot,
        appSkills: portfolioItem.appSkills,
        appIcon: portfolioItem.appIcon,
        appStore: portfolioItem.appStore
      });
    }
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const portfolioData = {
      id: this.state.id,
      appTitle: this.state.appTitle,
      appInfo: this.state.appInfo,
      appCategory: this.state.appCategory,
      appScreenshot: this.state.appScreenshot,
      appSkills: this.state.appSkills,
      appIcon: this.state.appIcon,
      appStore: this.state.appStore
    };

    this.props.addEditPortfolio(portfolioData, this.props.history);
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
              <TextfieldInput
                placeholder='*App icon image'
                name='appIcon'
                value={this.state.appIcon}
                errors={errors.appIcon}
                onChange={this.handleOnChange}
              />
              <TextfieldInput
                placeholder='App store URL'
                name='appStore'
                value={this.state.appStore}
                errors={errors.appStore}
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

AddEditPortfolio.propTypes = {
  errors: PropTypes.object.isRequired,
  addEditPortfolio: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addEditPortfolio }
)(withRouter(AddEditPortfolio));
