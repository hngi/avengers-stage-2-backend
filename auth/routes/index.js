import { Router } from "express";
import auth from '../auth';
import passport from "passport";
import User from '../models/User'
import AuthController from '../auth_controllers/authcontroller';
import bcrypt from 'bcrypt';
import dns from 'dns';

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
  .post(AuthController.checkEmailValidity, (req, res, next) => {
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

router.route('/reset-password')
  .post(AuthController.authRequired, (req, res) => {
    const {old_password, new_password, confirm_password} = req.body;
    User.findOne({email: req.user.email}, (err, user) => {
      if(err) {
        res.json({result: 'error', status: 'something went wrong'});
      }
      if(bcrypt.compareSync(old_password, user.password) && new_password == confirm_password) {
        user.password = bcrypt.hashSync(new_password, 12);
        user.save((err, data) => {
          if(err) return res.json({result: 'error', status: 'unable to reset password'});
          res.json({result: 'success', status: 'Password has being updated'});
        })
      }
    })
  })



  router.get('/rem', (req, res) => {
    User.remove({}, (err, data) => {
      res.send(data)
    })
  })

  router.get('/all', (req, res) => {
    User.find({}, (err, data) => {
      res.send(data)
    })
  })

export default router;