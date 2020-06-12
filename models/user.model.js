const mongoose = require("mongoose");
const passwordHash = require("./passwordPlugin");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  googleId: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.plugin(passwordHash);

module.exports = User = mongoose.model("users", userSchema);
