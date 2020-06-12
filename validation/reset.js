const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateResetInput (data) {
    let errors = {}

    for (const param in data) {
        data[param] = data[param].trim()
    }

    const { new_password, confirm_password } = data;

    if (!new_password || Validator.isEmpty(new_password)) {
        errors.new_password = 'Password is required'
    } else if (!Validator.isLength(new_password, { min: 6, max: 30 })) {
        errors.new_password = 'Password must be between 6 and 30 characters'
    }

    if (!confirm_password || Validator.isEmpty(confirm_password)) {
        errors.confirm_password = 'Please confirm password'
    } else if (!Validator.equals(new_password, confirm_password)) {
        errors.confirm_password = 'Password must match'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
