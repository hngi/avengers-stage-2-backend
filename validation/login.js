const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateLoginInput (data) {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be more than 5 characters'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
