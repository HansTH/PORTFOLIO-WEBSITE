const validator = require('validator');
const isEmpty = require('../helpers/isEmpty');

module.exports = function validatePortfolioInput(data) {
  let errors = {};

  data.appTitle = !isEmpty(data.appTitle) ? data.appTitle : '';
  data.appInfo = !isEmpty(data.appInfo) ? data.appInfo : '';
  data.appCategory = !isEmpty(data.appCategory) ? data.appCategory : '';
  data.appDescription = !isEmpty(data.appDescription)
    ? data.appDescription
    : '';
  data.appIcon = !isEmpty(data.appIcon) ? data.appIcon : '';
  data.appYear = !isEmpty(data.appYear) ? data.appYear : '';
  data.appStoreURL = !isEmpty(data.appStoreURL) ? data.appStoreURL : '';

  if (validator.isEmpty(data.appTitle)) {
    errors.appTitle = 'App title field is required.';
  }

  if (validator.isEmpty(data.appInfo)) {
    errors.appInfo = 'App info field is required.';
  }

  if (validator.isEmpty(data.appCategory)) {
    errors.appCategory = 'App category field is required.';
  }

  if (validator.isEmpty(data.appScreenshots)) {
    errors.appScreenshots = 'Screenshots URL location field is required.';
  }
  if (validator.isEmpty(data.appSkills)) {
    errors.appSkills = 'App skills field is required.';
  }
  if (validator.isEmpty(data.appIcon)) {
    errors.appIcon = 'App icon field is required.';
  }
  if (validator.isEmpty(data.appYear)) {
    errors.appYear = 'App year field is required.';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
