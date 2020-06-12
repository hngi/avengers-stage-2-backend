const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signedJWT = (email) => {
  const token = jwt.sign(
    {
      email,
    },
    process.env.SECRET_TOKEN,
    {
      expiresIn: "4800s",
    }
  );
  return token;
};

exports.generateEmailToken = async (email) => {
  let token = jwt.sign(
    {
      email,
    },
    process.env.SECRET_TOKEN,
    {
      expiresIn: "4800s",
    }
  );
  return token;
};
