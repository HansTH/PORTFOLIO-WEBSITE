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
    appScreenshots: '',
    appSkills: '',
    appIcon: '',
    appStoreURL: '',
    appYear: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.item) {
      const portfolioItem = nextProps.profile.item;

      const appSkillsString = portfolioItem.appSkills.join(',');
      const appScreenshotsString = portfolioItem.appScreenshots.join(',');
      portfolioItem.appSkills = appSkillsString;
      portfolioItem.appScreenshots = appScreenshotsString;

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
      portfolioItem.appIcon = !isEmpty(portfolioItem.appIcon)
        ? portfolioItem.appIcon
        : '';
      portfolioItem.appStoreURL = !isEmpty(portfolioItem.appStoreURL)
        ? portfolioItem.appStoreURL
        : '';
      portfolioItem.appYear = !isEmpty(portfolioItem.appYear)
        ? portfolioItem.appYear
        : '';

      this.setState({
        id: portfolioItem.id,
        appTitle: portfolioItem.appTitle,
        appInfo: portfolioItem.appInfo,
        appCategory: portfolioItem.appCategory,
        appScreenshots: portfolioItem.appScreenshots,
        appSkills: portfolioItem.appSkills,
        appIcon: portfolioItem.appIcon,
        appStoreURL: portfolioItem.appStoreURL,
        appYear: portfolioItem.appYear
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
      appScreenshots: this.state.appScreenshots,
      appSkills: this.state.appSkills,
      appIcon: this.state.appIcon,
      appStoreURL: this.state.appStoreURL,
      appYear: this.state.appYear
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
              <TextareaInput
                placeholder='*URL location'
                name='appScreenshots'
                value={this.state.appScreenshots}
                errors={errors.appScreenshots}
                onChange={this.handleOnChange}
                info='Please use comma separated values (https://, https://, ...).'
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
                name='appStoreURL'
                value={this.state.appStoreURL}
                errors={errors.appStoreURL}
                onChange={this.handleOnChange}
              />
              <TextfieldInput
                placeholder='App year'
                name='appYear'
                value={this.state.appYear}
                errors={errors.appYear}
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
