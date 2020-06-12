require("dotenv").config();
const jwt = require("jsonwebtoken");
const validateChangeInput = require("../validation/change");
const User = require("../models/user.model");

module.exports = async (userData, token) => {
  const error = validateChangeInput(req.body);
  //Check Validation
  if (error) {
    throw new Error(error);
  }
  const { password } = userData;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    throw new Error("Password reset token is invalid or has expired.");
  }
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  user.password = password;
  user.save();
};
