const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateChangeInput (data) {
  let errors = {}

  for (const param in data) {
    data[param] = data[param].trim()
  }
  const { password, confirmPassword } = data;

  if (!password || Validator.isEmpty(password)) {
    errors.password = 'Password is required'
  } else if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters'
  }

  if (!confirmPassword || Validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = 'Please confirm password'
  } else if (!Validator.equals(password, confirmPassword)) {
    errors.confirmPassword = 'Password must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
