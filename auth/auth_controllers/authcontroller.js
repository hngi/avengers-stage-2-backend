import passport from 'passport';

class AuthController {

    static signIn(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
    
          if(!user) return res.json({result: 'error', status: 'No user found'})
          req.login(user, (err) => {
            
            if(err) {
              //something went wrong
              res.json({result: 'error', status: 'Unable to log in'})
            } else {
              //successful login
              res.json({result: 'success', status: 'Authenticated and logged in.'});
            }
    
          })
        })(req, res, next);
      }
}

export default AuthController;