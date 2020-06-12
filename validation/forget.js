const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateForgetInput (data) {
  let errors = {}

    for (const param in data) {
        data[param] = data[param].trim()
    }

    const { email } = data;
    
    if (!email || Validator.isEmpty(email)) {
        errors.email = 'Email field is required'
    } else if (!Validator.isEmail(email)) {
        errors.email = 'Email is invalid'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
