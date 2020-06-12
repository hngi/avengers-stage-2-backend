const mongoose = require('mongoose');

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
},
  {timestamps: true}
);

module.exports = User = mongoose.model('users', userSchema);
