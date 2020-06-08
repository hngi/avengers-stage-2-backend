import { Router } from "express";
import auth from '../auth';
import passport from "passport";
import User from '../models/User'
import AuthController from '../auth_controllers/authcontroller';
import bcrypt from 'bcrypt';

const router = Router();

router.get("/hello", function (req, res) {
    return res.status(200).json({
          success: true,
          message: "Hello world",
          id: req.sessionID,
          session: req.session.passport,
        });
});

router.route("/login")
  .post(AuthController.signIn);

router.route('/register')
  .post((req, res, next) => {
    const {email, first_name, last_name, gender, password} = req.body;

    User.findOne({email: email}, (err, user) => {
      if(err) return next(err);
      if(user) {
        return next(null, false);
      } else {

        try {
          let newUser = new User({
            email: email, 
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            password: bcrypt.hashSync(password, 12)
          });

          newUser.save((err, new_user) => {
            if(err) return next(err);
            console.log('created user');
            return next(null, new_user);
          });

        } catch(err) {
          res.json({result: 'error', status: 'Fields not filled correctly'});
        }

      }
    })
  }, AuthController.signIn);

  // router.get('/rem', (req, res) => {
  //   User.remove({}, (err, data) => {
  //     res.send(data)
  //   })
  // })

export default router;