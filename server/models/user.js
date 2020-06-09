  var mongoose = require('mongoose');
  var bcrypt = require('bcryptjs');

  // Schema defines how the user's data will be stored in MongoDB
  var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['Client', 'Manager', 'Admin'],
      default: 'Client'
    }
  });

  // Saves the user's password hashed (plain text password storage is not good)
  UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) { // check if the password is new or has been messed with

      //Becryptjs should generate a salt 
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return next(err);
        }
        //  This is where we hash the passwords
        // I always add the the user's mongodb id just to provide that exit feel free 
        bcrypt.hash(user.password + user._id, salt, function (err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });


  module.exports = mongoose.model('user', UserSchema);