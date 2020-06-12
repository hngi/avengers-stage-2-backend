require("dotenv").config();
const jwt = require("jsonwebtoken");
const validateResetInput = require("../validation/reset");
const User = require("../models/user.model");

module.exports = async (userData, token) => {
  const error = validateResetInput(userData);
  //Check Validation
  if (error) {
    throw new Error(error);
  }
  const { old_password, new_password } = userData;
  const userData = jwt.verify(token, process.env.SECRET_TOKEN);
  if (!userData) {
    throw new Error("Unauthorised Access");
  }
  const { email } = userData;
  const user = await User.findOne({ email });
  if (user.password) {
    let isPasswordMatched = await bcrypt.compare(old_password, user.password);
    if (isPasswordMatched) {
      user.password = new_password;
      await user.save();
      return { success: true, response: "Password successfully reset" };
    } else {
      throw new Error("Incorrect old password");
    }
  } else {
    user.password = new_password;
    await user.save();
    return { success: true, response: "Password successfully reset" };
  }
};
