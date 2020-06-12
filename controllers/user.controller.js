const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
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
                // const msg = `<b>Hello ${user.email}<b><br /><p> Thank you for registering with us</p><br /> <p><i> Team Avengers </i></p>`
                // MailerUtil.sendMail(user.email, 'Registration Successful', msg ).then((e) => {
                //   res.status(200).send({ success: true, data: user })
                // }).catch(() => {
                  res.status(200).send({ success: true, data: user })
                // })
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

        const userID = user._id;
        const token = TokenUtil.signedJWT(email);

        return res.status(200).send({
          success: true,
          userID,
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

exports.authenticate = (req, res) => {
  jwt.verify(req.token, process.env.SECRET_TOKEN, async (err, userData) => {
    if(err) {
      res.status(401).json({response: 'Unauthorised access'});
    } else {
      const { email } = userData;
      try {
        let user = await User.findOne({ email });
        return res.status(200).send({ success: true, userID: user._id, token: req.token })
      } catch (e) {
        res.status(401).json({ response: 'Unauthorised access' });
      }
    }
  })
}

exports.resetPassword = (req, res) => {
  const { errors, isValid } = validateResetInput(req.body)

  //Check Validation
  if (!isValid) {
    return res.status(400).send({ response: errors })
  }

  const { old_password, new_password } = req.body;
  jwt.verify(req.token, process.env.SECRET_TOKEN, async (err, userData) => {
    if (err) {
      res.status(401).json({ response: 'Unauthorised access' });
    } else {
      const { email } = userData;
      try {
        let user = await User.findOne({ email });
        if (!user.password) {
          let isPasswordMatched = await bcrypt.compare(old_password, user.password)
          if (isPasswordMatched) {
            let hashedPassword = await bcrypt.hash(new_password, 10)
            user.password = hashedPassword;
            user = await user.save()
            return res.status(200).send({ success: true, response: 'Password successfully reset' })
          } else {
            res.status(403).send({ response: 'Incorrect old password' });
          }
        } else {
          let hashedPassword = await bcrypt.hash(new_password, 10)
          user.password = hashedPassword;
          user = await user.save();
          return res.status(200).send({ success: true, response: 'Password successfully reset' })
        }
      } catch (e) {

      }
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
  const token = await TokenUtil.generateEmailToken(email);

  User.findOne({ email }, function(err, user) {
    if (!user) {
      return res.status(400).send({ response: 'No account with that email address exists.' })
    }
    else {
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      const url = `${req.headers.host}/v1/change-password/${token}`;
      user.save((err, data) => {
        res.status(200).send({ success: true, url })
      })
    }
  });
}

exports.changePassword = function(req, res) {
  const { errors, isValid } = validateChangeInput(req.body)

  //Check Validation
  if (!isValid) {
    return res.status(400).send({ response: errors })
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
          res.status(200).send({ success: true, response: 'Password changed' })
        })
      })
    })
  }) 
}