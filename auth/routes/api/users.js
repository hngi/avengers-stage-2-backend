const express = require('express');
const router = express.Router();
const UsersController = require('../../controllers/UsersController');
const { check, validationResult } = require('express-validator');

// @route /api/users
// @desc Register User
// @access Public

router.post("/", [
  check('email','Enter a valid email').isEmail(),
  check('password','Please enter a password with 6 or more characters').isLength({ min: 6})
], (req,res) => UsersController.store(req,res,validationResult));

module.exports = router;
