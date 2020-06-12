var bcrypt = require("bcryptjs");

module.exports = function passwordHash(schema) {
  schema.pre("save", function(next) {
    if (!this.isModified("password")) {
      return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }

      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }

        this.password = hash;
        next();
      });
    });
  });
};
