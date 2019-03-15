const Validator = require('validator');
const isEmpty = require('../helpers/isEmpty');

const validateExperienceInput = data => {
  let errors = {};

  data.companyName = !isEmpty(data.companyName) ? data.companyName : '';
  data.companyCity = !isEmpty(data.companyCity) ? data.companyCity : '';
  data.companyStart = !isEmpty(data.companyStart) ? data.companyStart : '';
  data.companyJobTitle = !isEmpty(data.companyJobTitle)
    ? data.companyJobTitle
    : '';
  data.companyJobInfo = !isEmpty(data.companyJobInfo)
    ? data.companyJobInfo
    : '';

  // validate is empty
  if (Validator.isEmpty(data.companyName)) {
    errors.companyName = 'Name field is required';
  }

  if (Validator.isEmpty(data.companyCity)) {
    errors.companyCity = 'City field is required';
  }

  if (Validator.isEmpty(data.companyStart)) {
    errors.companyStart = 'From date field is required';
  }

  if (Validator.isEmpty(data.companyJobTitle)) {
    errors.companyJobTitle = 'Job title field is required';
  }

  if (Validator.isEmpty(data.companyJobInfo)) {
    errors.companyJobInfo = 'Description field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateExperienceInput;
