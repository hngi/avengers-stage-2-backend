const User = require("../../models/user.model");
const TokenUtil = require("../../util/token");

module.exports = async (email, googleId) => {
  const returnObject = user => {
    return {
      success: true,
      userID: user._id,
      token: TokenUtil.signedJWT(email)
    };
  };
  const user = await User.findOne({ email });
  if (user) {
    return returnObject(user);
  } else {
    const newUser = new User({
      email,
      googleId
    });
    await newUser.save();
    return returnObject(newUser);
  }
};
