import passport from 'passport';
import EmailValidator from 'email-validator';
import dns from 'dns';

class AuthController {

    static signIn(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
    
          req.login(user, (err) => {
            console.log('logging in user')
            if(err) {
              //something went wrong
              res.json({result: 'error', status: 'Unable to log in'})
            } else {
              //successful login
              res.json({
                result: 'success', 
                status: 'Authenticated and logged in.',
                userDetails: {
                  email: req.user.email,
                  first_name: req.user.first_name,
                  last_name: req.user.last_name,
                  gender: req.user.gender
                }
              });
            }
    
          })
        })(req, res, next);
      }

      static authRequired(req, res, next) {
        if(req.isAuthenticated()) {
          return next();
        }
        return res.json({result: 'error', status: 'Must be logged in first'})
      }

      static checkEmailValidity(req, res, next) {
        const email = req.body.email;



        if(EmailValidator.validate(email)) {
          let hostname = email.substring(email.indexOf('@') + 1);
          
          dns.lookup(hostname, (err, address, family) => {
            if(address && family) {
              console.log(address, family)
              return next();
            }
            return res.json({result: 'error', status: 'Invalid hostname for email'});
          })
        } else {
          res.json({esult: 'error', status: 'Invalid email address'})
        }
      }
}

export default AuthController;