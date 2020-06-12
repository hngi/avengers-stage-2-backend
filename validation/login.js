const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateLoginInput (data) {
  let errors = {}

  for (const param in data) {
    data[param] = data[param].trim()
  }
  
const { email, password } = data;

  if (!email || Validator.isEmpty(email)) {
    errors.email = 'Email field is required'
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid'
  }

  if (!password || Validator.isEmpty(password)) {
    errors.password = 'Password is required'
  } else if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
