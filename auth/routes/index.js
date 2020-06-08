//jshint esversion:6
import { Router } from "express";
import app from "./app";
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const router = Router();


mongoose.connect("mongodb://localhost:27017/userDB", {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



router.post("/login", function(req, res) {

  const user = new User({
      username: req.body.username,
      password: req.body.password,
  });

  req.login(user, function (err) {
      if (err) {
          console.log(err);
          res.send("error");
      } else {
          passport.authenticate("local")(req, res, function () {
              res.send("success");
          })
      }
  });

});


router.post("/register", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  
  User.register({username: username}, password, function (err, user) {
      if (!err) {    
          passport.authenticate("local")(req, res, function () {
              res.send("success");
          });
      } else {
          console.log(err);
          res.send("error");
      }
  });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.send("success");
});





router.get("/hello", function (req, res) {
    return res.status(200).send({
          success: true,
          message: "Hello world"
        });
} );



export default router;
