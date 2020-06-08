import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";

const router = Router();

dotenv.config();

router.get("/hello", function (req, res) {
    return res.status(200).send({
          success: true,
          message: "Hello world"
        });
} );

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(() => {
      res.status(201).json({ message: 'User Added!!! '})
    })
  })
  .catch(error => {
    res.status(500).json({ error: error });
  })
})

router.post("/signin", (req, res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
      if(!user) {
          return res.status(401).json({
              error: 'Email not found'
          });
      }
      bcrypt.compare(req.body.password, user.password)
       .then(valid => {
           if(!valid) {
             return res.status(401).json({
                 error: 'Incorrect password!!!'
             });
           }
           const token = jwt.sign(
               {userId: user._id},process.env.SECRET,{ expiresIn: '24h' }
           );
           res.status(200).json({
               id: user._id,
               token: token,
               message: 'Login successful'
           });
       })
       .catch(error => {
           res.status(500).json({error: error});
       })
  })
   .catch(error => {
       res.status(500).json({error: error});
   })
})

export default router;