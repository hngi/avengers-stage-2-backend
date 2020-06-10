const jwt = require('jsonwebtoken')
const crypto = require('crypto')
require('dotenv').config()

exports.signedJWT = (email) => {
    console.log(email);
    const token = jwt.sign({
        email
    },  process.env.SECRET_TOKEN, {
        expiresIn: '4800s'
    })
    console.log(token);
    return token;
}

exports.generateEmailToken = async () => {
  let token = await crypto.randomBytes(20);
  token = token.toString('hex');
  return token;
}