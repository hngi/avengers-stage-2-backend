const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const async = require('async')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
require('dotenv').config()

//Load Input Validation
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
const validateResetInput = require('../validation/reset')

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
            .then(user =>
              res
                .status(200)
                .send({ success: true, data: user })
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

        const token = jwt.sign(
          {
            email
          },
          process.env.SECRET_TOKEN,
          {
            expiresIn: '4800s'
          }
        )

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
  const { errors, isValid } = validateRegisterInput(req.body)

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
              return res.status(200).send({ success: true, response: 'Password successfully reset'})
            })
          })
        })
      })
    }
  })
}



exports.reset = function (req, res) {
  
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          
          console.log('No account with that email address exists.')
        }
        else {
        
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
        user.save(function(err) {
          done(err, token, user);
        });
      }
      });
    },
    function(token, user, done) {
        
      let smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'mamudseun@gmail.com',
            clientId: '115118855190-nf6g5enqktl3uhqb1883tlr02m6f69pr.apps.googleusercontent.com',
            clientSecret: 'e1e6Ul-7s-RAm20uVKT0W_An',
            refreshToken: '1//04RP77MTu11fcCgYIARAAGAQSNwF-L9IrMYYXlpXARG-vKe_HkqGyfLuaMD9WdJZsQJ0sP2Hyd_RrF9NIx9FIlviAmxUfvpiPyx4',
            accessToken: 'ya29.a0AfH6SMC1wtax57Kq3tRYHp0D25rhuczTFVUaAEjsP_PV4qMRSZzYU2qoYQ07ItIuAT-hvSRJaPEHQvZrgFfEslSaVtze8cl5l5yechPXxp917uAYMsjnc2zAykbYq0ANVcs4GonCl_C6P_O3tcLRmkgz9bMwsGGF5gE',
            expires: 1484314697598
        }
    });
  
  
      smtpTransport.verify(function(error, success) {
        if (error) {
          
          console.log(error);
          
        } else {
          console.log("Server is ready to take our messages");
        }
      });
  
      
      var mailOptions = {
        
        from: 'mamudseun@gmail.com',
        to: user.email,
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/api/v1/change-password/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        
      };
  
     
  
  
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('email sent')
        
        res.send('Mail sent successfully');
      });
    }
  ], function(err) {
    console.log('err:', err)
  });
  }

exports.changePassword = function(req, res) {
  
  async.waterfall([
    function(done) {
      
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          console.log('error', 'Password reset token is invalid or has expired.');
          
          return res.redirect('/');
        }
        

        if(req.body.password === req.body.confirmPassword) {
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;
                    user.password = hash
                    user.save()
                      .then(user =>
                        res
                          .status(200)
                          .send({ success: true, data: user })
                      )
                      .catch(err => console.log(err))
                  })
                }) 
        }
      });
    },
    
    function(user, done) {
      let smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'mamudseun@gmail.com',
            clientId: '115118855190-nf6g5enqktl3uhqb1883tlr02m6f69pr.apps.googleusercontent.com',
            clientSecret: 'e1e6Ul-7s-RAm20uVKT0W_An',
            refreshToken: '1//04RP77MTu11fcCgYIARAAGAQSNwF-L9IrMYYXlpXARG-vKe_HkqGyfLuaMD9WdJZsQJ0sP2Hyd_RrF9NIx9FIlviAmxUfvpiPyx4',
            accessToken: 'ya29.a0AfH6SMC1wtax57Kq3tRYHp0D25rhuczTFVUaAEjsP_PV4qMRSZzYU2qoYQ07ItIuAT-hvSRJaPEHQvZrgFfEslSaVtze8cl5l5yechPXxp917uAYMsjnc2zAykbYq0ANVcs4GonCl_C6P_O3tcLRmkgz9bMwsGGF5gE',
            expires: 1484314697598
        }
    });

      var mailOptions = {
        to: user.username,
        from: 'mamudseun@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        res.send('success')
        done('success');
      });
    }
  ], function(err) {
    res.redirect('/');
  });
}