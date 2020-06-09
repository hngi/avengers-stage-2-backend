const validateRegisterInput = require("./register");
const validateLoginInput = require("./login");
const validateForgotPassword = require("./forgotPassword");
const validateResetInput = require("../validation/reset");
const validateForgetInput = require("../validation/forget");
const validateChangeInput = require("../validation/change");

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateForgotPassword,
  validateResetInput,
  validateForgetInput,
  validateChangeInput,
};
