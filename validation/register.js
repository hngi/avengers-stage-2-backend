const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  if (Validator.isEmpty(data.email)) {
    return "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    return "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    return "Password is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    return "Password must be more than 5 characters";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    return "Please confirm password";
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    return "Password must match";
  }

  return null;
};
