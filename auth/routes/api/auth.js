const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/AuthController');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


// @route /api/auth
// @desc Auth Route
// @access Public

router.get("/", auth, (req,res) => AuthController.index(req,res));
router.post("/", [
    check('email','Enter a valid email').isEmail(),
    check('password','Password is required').exists()
  ],(req,res) => AuthController.login(req,res,validationResult));

module.exports = router;
