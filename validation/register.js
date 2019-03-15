const Validator = require('validator');
const isEmpty = require('../helpers/isEmpty');

const validateRegisterInput = data => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // validate username
  if (!Validator.isLength(data.username, { min: 4, max: 30 })) {
    errors.username = 'Username must be between 4 and 30 characters';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }
  // validate email
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  // validate password
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  // validate password2
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }
  // validate if passwords are match
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
