const validator = require('validator');
const isEmpty = require('../helpers/isEmpty');

module.exports = function validatePortfolioInput(data) {
  let errors = {};

  data.appTitle = !isEmpty(data.appTitle) ? data.appTitle : '';
  data.appInfo = !isEmpty(data.appInfo) ? data.appInfo : '';
  data.appYear = !isEmpty(data.appYear) ? data.appYear : '';
  data.appScreenshot = !isEmpty(data.appScreenshot) ? data.appScreenshot : '';
  data.appDescription = !isEmpty(data.appDescription)
    ? data.appDescription
    : '';

  if (validator.isEmpty(data.appTitle)) {
    errors.appTitle = 'Title field is required.';
  }

  if (validator.isEmpty(data.appInfo)) {
    errors.appInfo = 'Info field is required.';
  }

  if (validator.isEmpty(data.appYear)) {
    errors.appYear = 'Year of study field is required.';
  }

  if (validator.isEmpty(data.appScreenshot)) {
    errors.appScreenshot = 'URL location field is required.';
  }
  if (validator.isEmpty(data.appSkills)) {
    errors.appSkills = 'Skills field is required.';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
