require("dotenv").config();
const jwt = require("jsonwebtoken");
const validateForgetInput = require("../validation/forget");
const User = require("../models/user.model");
const TokenUtil = require("../util/token");

module.exports = async (userData, header) => {
  const error = validateForgetInput(userData);
  if (error) {
    throw new Error(error);
  }
  const { email } = userData;
  const token = await TokenUtil.generateEmailToken(email);
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("No account with that email address exists.");
  }
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  const url = `${header.host}/api/v1/change-password/${token}`;
  return { success: true, url };
};
