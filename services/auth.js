const jwt = require("jsonwebtoken");

const secrettoken = process.env.SECRET_TOKEN;

exports.generateToken = (payload, expiresIn) =>
  jwt.sign(payload, secrettoken, { expiresIn });

// exports.verifyToken = should be here going forward
