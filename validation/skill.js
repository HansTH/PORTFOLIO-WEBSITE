const validator = require('validator');
const isEmpty = require('../helpers/isEmpty');

module.exports = function validateSkillInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  data.icon = !isEmpty(data.icon) ? data.icon : '';

  if (validator.isEmpty(data.title)) {
    errors.title = 'Skill title field is required.';
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required.';
  }

  if (validator.isEmpty(data.icon)) {
    errors.icon = 'Icon field is required.';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
