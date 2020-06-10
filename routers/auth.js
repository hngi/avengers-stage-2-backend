const express = require('express')
const router = express.Router()
const User = require('../models/user.model');

//const  {userValidator} = require('../validators/index')

const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  require('dotenv').config()
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_IDD,
    clientSecret: process.env.GOOGLE_CLIENT_SECRETT,
    callbackURL:  'http://localhost:3000/api/v1/google/callback',
    //accessType: 'offline',
    //passReqToCallback   : true,
    userProfileURL:'https://www.googleapis.com/oauth2/v3/userinfo'
  },
  function(accessToken, refreshToken, profile,done) {
    console.log(profile.emails[0].value)
    User.findOrCreate({ googleId: profile.id,email:profile.emails[0].value }, function (err, user) {
     // console.log('user')
      return done(err, user);
    });
  }
  ));
router.get('/api/v1/google/callback',passport.authenticate('google'),
function(req, res) {
    
  res.json({success: true, message: 'success'}) 
 
})
router.get('/v1/google', 
passport.authenticate('google', {
  scope: ['profile', 'email']
})
);
module.exports = router