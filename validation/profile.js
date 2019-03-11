const validator = require('validator');
const isEmpty = require('../helpers/isEmpty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
  data.jobtitle = !isEmpty(data.jobtitle) ? data.jobtitle : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : '';
  data.contactEmail = !isEmpty(data.contactEmail) ? data.contactEmail : '';
  data.contactTitle = !isEmpty(data.contactTitle) ? data.contactTitle : '';

  // full name
  if (validator.isEmpty(data.fullname)) {
    errors.fullname = 'Full name field is required.';
  }

  // job title
  if (validator.isEmpty(data.jobtitle)) {
    errors.jobtitle = 'Job title field is required.';
  }

  // skills
  if (validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required.';
  }
  // contactNumber
  if (validator.isEmpty(data.contactNumber)) {
    errors.contactNumber = 'Mobile field is required.';
  }
  // contactEmail
  if (validator.isEmpty(data.contactEmail)) {
    errors.contactEmail = 'Email field is required.';
  }
  // contactTitle
  if (validator.isEmpty(data.contactTitle)) {
    errors.contactTitle = 'Title field is required.';
  }

  // website
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Not a valid URL.';
    }
  }

  // social
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL.';
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL.';
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL.';
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL.';
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL.';
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
