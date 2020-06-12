const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const validateLoginInput = require("../validation/login");
const TokenUtil = require("../util/token");

module.exports = async userData => {
  const error = validateLoginInput(userData);
  //Check Validation
  if (error) {
    throw new Error(error);
  }

  const { email, password } = userData;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User does Not Exist");
  }
  const flag = await bcrypt.compare(password, user.password);
  if (!flag) {
    throw new Error("Invalid username or password");
  }

  const userID = user._id;
  const token = TokenUtil.signedJWT(email);
  return { success: true, userID, token };
};
