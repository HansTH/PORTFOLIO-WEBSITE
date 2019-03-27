const validator = require('validator');
const isEmpty = require('../helpers/isEmpty');

module.exports = function validateSkillInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  data.icon = !isEmpty(data.icon) ? data.icon : '';
  data.level = !isEmpty(data.level) ? data.level : '';

  if (validator.isEmpty(data.title)) {
    errors.title = 'Skill title field is required.';
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required.';
  }

  if (validator.isEmpty(data.icon)) {
    errors.icon = 'URL location field is required.';
  }
  if (!validator.isInt(data.level, { min: 0, max: 100 })) {
    errors.level = 'Skill level must between 0 at 100.';
  }

  if (validator.isEmpty(data.level)) {
    errors.level = 'Level field is required.';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
