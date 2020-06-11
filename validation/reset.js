const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateResetInput (data) {
  let errors = {}

    data.new_password = !isEmpty(data.new_password) ? data.new_password : ''
    data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password: ''

    if (Validator.isEmpty(data.new_password)) {
        errors.new_password = 'New Password is required'
    }

    if (Validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = 'Please confirm new password'
    }

    if (!Validator.isLength(data.new_password, { min: 6, max: 30 })) {
        errors.password = 'Password must be more than 5 characters'
    }

    if (!Validator.equals(data.new_password, data.confirm_password)) {
        errors.confirm_password = 'New password must match'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
