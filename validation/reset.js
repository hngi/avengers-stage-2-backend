const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateResetInput(data) {
  data.new_password = !isEmpty(data.new_password) ? data.new_password : "";
  data.confirm_password = !isEmpty(data.confirm_password)
    ? data.confirm_password
    : "";

  if (Validator.isEmpty(data.new_password)) {
    return "New Password is required";
  }

  if (Validator.isEmpty(data.confirm_password)) {
    return "Please confirm new password";
  }

  if (!Validator.isLength(data.new_password, { min: 6, max: 30 })) {
    return "Password must be more than 5 characters";
  }

  if (!Validator.equals(data.new_password, data.confirm_password)) {
    return "New password must match";
  }

  return null;
};
