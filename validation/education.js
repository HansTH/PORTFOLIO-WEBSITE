const Validator = require('validator');
const isEmpty = require('../helpers/isEmpty');

const validatorEducationInput = data => {
  let errors = {};

  data.eduSchool = !isEmpty(data.eduSchool) ? data.eduSchool : '';
  data.eduTitle = !isEmpty(data.eduTitle) ? data.eduTitle : '';
  data.eduStart = !isEmpty(data.eduStart) ? data.eduStart : '';

  if (Validator.isEmpty(data.eduSchool)) {
    errors.eduSchool = 'School field is required';
  }
  if (Validator.isEmpty(data.eduTitle)) {
    errors.eduTitle = 'School field is required';
  }
  if (Validator.isEmpty(data.eduStart)) {
    errors.eduStart = 'School field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validatorEducationInput;
