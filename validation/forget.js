const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateForgetInput (data) {
  let errors = {}

    data.email = !isEmpty(data.email) ? data.email : ''

    if (Validator.isEmpty(data.email)) {
        errors.old_password = 'Email address is required'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email address is invalid'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
