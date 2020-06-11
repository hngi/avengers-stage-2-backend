const express = require('express')
const router = express.Router()
const User = require('../models/user.model');
require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_IDD,
  clientSecret: process.env.GOOGLE_CLIENT_SECRETT,
  callbackURL:  'http://localhost:3000/api/v1/google/callback',
  //accessType: 'offline',
  //passReqToCallback   : true,
  userProfileURL:'https://www.googleapis.com/oauth2/v3/userinfo'
}, (accessToken, refreshToken, profile, done) => {
  console.log(accessToken)
  console.log(refreshToken)
  console.log(profile.emails[0].value)
  // User.findOrCreate({ googleId: profile.id,email:profile.emails[0].value }, function (err, user) {
  //  // console.log('user')
  //   return done(err, user);
  // });
}));

router.get('/google/allback',passport.authenticate('google'), (req, res) => {  
  res.json({success: true, message: 'success'}) 
})

router.get('/google/signin', passport.authenticate('google', { scope: ['profile', 'email'] }, (req, res) => {
  console.log(req);
  res.status(200).json({ success: true, message: 'success' })
}));
module.exports = router