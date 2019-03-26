const validator = require('validator');
const isEmpty = require('../helpers/isEmpty');

module.exports = function validatePortfolioInput(data) {
  let errors = {};

  data.appTitle = !isEmpty(data.appTitle) ? data.appTitle : '';
  data.appInfo = !isEmpty(data.appInfo) ? data.appInfo : '';
  data.appCategory = !isEmpty(data.appCategory) ? data.appCategory : '';
  data.appScreenshot = !isEmpty(data.appScreenshot) ? data.appScreenshot : '';
  data.appDescription = !isEmpty(data.appDescription)
    ? data.appDescription
    : '';
  data.appIcon = !isEmpty(data.appIcon) ? data.appIcon : '';
  data.appStore = !isEmpty(data.appStore) ? data.appStore : '';

  if (validator.isEmpty(data.appTitle)) {
    errors.appTitle = 'Title field is required.';
  }

  if (validator.isEmpty(data.appInfo)) {
    errors.appInfo = 'Info field is required.';
  }

  if (validator.isEmpty(data.appCategory)) {
    errors.appCategory = 'Category field is required.';
  }

  if (validator.isEmpty(data.appScreenshot)) {
    errors.appScreenshot = 'URL location field is required.';
  }
  if (validator.isEmpty(data.appSkills)) {
    errors.appSkills = 'Skills field is required.';
  }
  if (validator.isEmpty(data.appIcon)) {
    errors.appIcon = 'Skills field is required.';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
