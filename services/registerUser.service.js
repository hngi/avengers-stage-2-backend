const validateRegisterInput = require("../validation/register");
const User = require("../models/user.model");

module.exports = async userData => {
  const error = validateRegisterInput(userData);

  //Check Validation
  if (error) {
    throw new Error(error);
  }

  const { email, password } = userData;

  const user = await User.findOne({ email: userData.email });
  if (user) {
    throw new Error("Email already exists");
  }

  const newUser = new User({
    email,
    password
  });
  newUser.save();
  return newUser;
};
