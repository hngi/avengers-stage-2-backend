const passport = require('passport');// inport passport
const GoogleAuthStrat = require('passport-google-oauth20');//importing the google oauth lib
const keys= require('./keys');
const User = require('../models/googleUser');//requireing google user 

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })

    done(user.id,(err)=>{
        console.log(err);
    })
})
passport.use( new GoogleAuthStrat(
    {
        // options to used
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret:keys.google.clientSecret
        
},
    (accessToken,refreshToken,profile,done)=>{
        //call back when code is given and got all profile info
        //check if user already exist in db
        User.findOne({googleId:profile.id}).then((currentUser)=>{
            if(currentUser){
                //already have a google user with this id
                console.log("user exist as",currentUser);
                done(null, currentUser)
            }else{
                //create new user
                new User({
                    username:profile.displayName,
                    googleId:profile.id 
                 }).save().then((newUser)=>{
                     console.log("new user created"+newUser);
                     done(null, newUser);
                    
                 }).catch(err => console.log(err)) 
            }
        }).catch(err => console.log(err))   
})
);