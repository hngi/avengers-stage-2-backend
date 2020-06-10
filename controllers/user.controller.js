const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const MailerUtil = require('../util/email')
const TokenUtil = require('../util/token')
require('dotenv').config()

//Load Input Validation
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
const validateResetInput = require('../validation/reset')
const validateForgetInput = require('../validation/forget')
const validateChangeInput = require('../validation/change')

exports.registerUser = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  //Check Validation
  if (!isValid) {
    return res.status(400).send({ response: errors })
  }

  const { email, password } = req.body

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).send({ response:  errors })
    } else {
      const newUser = new User({
        email,
        password
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user =>{
                const msg = `<b>Hello ${user.email}<b><br /><p> Thank you for registering with us</p><br /> <p><i> Team Avengers </i></p>`
                MailerUtil.sendMail(user.email, 'Registration Successful', msg ).then((e) => {
                  res.status(200).send({ success: true, data: user })
                }).catch(() => {
                  res.status(200).send({ success: true, data: user })
                })
              }
            )
            .catch(err => console.log(err))
        })
      })
    }
  })
}

exports.loginUser = (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body)

  //Check if the login is valid
  if (!isValid) {
    return res.status(400).send({ response: errors })
  }

  const { email, password } = req.body

  User.findOne({ email }).then(user => {

    if (!user) {
      return res.status(423).send({ response: 'User does not exist, kindly register!!'})
    }

    bcrypt
      .compare(password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(403).send({ response: 'Incorrect username or password' })
        }

        const token = TokenUtil.signedToken(email);

        return res.status(200).send({
          success: true,
          token
        })
      })
      .catch(err => console.log(err))
  })
}

exports.checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {
    const token = header.split(' ')[1];

    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
}

exports.resetPassword = (req, res) => {
  const { errors, isValid } = validateResetInput(req.body)

  //Check Validation
  if (!isValid) {
    return res.status(400).send({ response: errors })
  }

  const {old_password, new_password, confirm_password} = req.body;
  jwt.verify(req.token, process.env.SECRET_TOKEN, (err, userData) => {
    if(err) {
      res.status(403).json({response: 'Unable to reset password'});
    } else {
      const {email} = userData;
      User.findOne({email}, (err, user) => {
        bcrypt.compare(req.body.old_password, user.password, function(err, result) {
          
          if (!result) return res.status(403).send({response: 'Incorrect password'});
          if (new_password !== confirm_password) return res.status(403).send({ response: 'Passwords do not match.' })
          bcrypt.hash(new_password, 10, (err, pwHash) => {
            if(err) throw err;
            user.password = pwHash;
            user.save((err, data) => {
              const msg = `<b>Hello ${email}<b><br /><p> Your password was succefully changed, if you did't initialize this, please contact us</p><br /> <p><i> Team Avengers </i></p>`
              MailerUtil.sendMail(email, 'Password Changed', msg ).then((e) => {
                return res.status(200).send({ success: true, response: 'Password successfully reset'})
              }).catch(() => {
                return res.status(200).send({ success: true, response: 'Password successfully reset'})
              })
            })
          })
        })
      })
    }
  })
}

exports.reset = async (req, res) => {
  const { errors, isValid } = validateForgetInput(req.body)

  //Check Validation
  if (!isValid) {
    return res.status(400).send({ response: errors })
  }

  const {email} = req.body;
  const token = await TokenUtil.generateEmailToken();

  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      return res.status(400).send({ response: 'No account with that email address exists.' })
    }
    else {
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      const urll = `${req.headers.host}/api/v1/change-password/${token}`;
      console.log(urll);

      user.save((err, data) => {
        const subject = 'Password Reset Link';
        const msg = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${urll}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`;
        MailerUtil.sendMail(user.email, subject, msg ).then((e) => {
          res.status(200).send({ success: true, url: urll, msg })
        }).catch(() => {
          res.status(200).send({ success: true, url: urll, msg })
        })
      })
    }
  });
}

exports.changePassword = function(req, res) {
  const { errors, isValid } = validateChangeInput(req.body)

  //Check Validation
  if (!isValid) {
    return res.status(403).send({ response: errors })
  }

  const {password} = req.body;
  const {token} = req.params;

  User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if(err){
      return res.status(400).send({ response: 'Error changing password' })
    }

    if (!user) {
      return res.status(400).send({ response: 'Password reset token is invalid or has expired.' })
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return res.status(400).send({ response: 'Error changing password' })
        }

        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        user.password = hash

        user.save((err, data) => {
          const subject = 'Password Changed';
          const msg = `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`;
          MailerUtil.sendMail(user.email, subject, msg ).then((e) => {
            res.status(200).send({ success: true, response: 'Password changed' })
          }).catch(() => {
            res.status(200).send({ success: true, response: 'Password changed' })
          })
          res.status(200).send('changed');
        })
      })
    })
  }) 
}