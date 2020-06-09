import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import User from './models/User';
import { Model } from 'mongoose';


// LocalStrategy called by passport.authenticate('local') in routes index

passport.use(new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) => {

        User.findOne({email: email}, (err, user) => {
            if(err) return done(err);
            if(!user) {return done(null, false);}
            if(!bcrypt.compareSync(password, user.password)) {
                return done(null, false);
            }
            return done(null, user);
        })
    }
))

// Serialize user to session store on first login
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// deserialize user from session store

passport.deserializeUser((id, done) => {
    //find user using id from session store
    console.log('inside ds cb')
    User.findById(id, (err, user) => {
        if(err) return done(err);
        done(null, user);
    });
})

module.exports = passport;