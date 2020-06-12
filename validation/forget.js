const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateForgetInput(data) {
  data.email = !isEmpty(data.email) ? data.email : "";

  if (Validator.isEmpty(data.email)) {
    return "Email address is required";
  }

  if (!Validator.isEmail(data.email)) {
    return "Email address is invalid";
  }

  return null;
};
