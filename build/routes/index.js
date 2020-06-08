"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = require("../controllers/auth.controller");

var _expressValidator = require("express-validator");

const router = (0, _express.Router)();
router.get("/hello", function (req, res) {
  return res.status(200).send({
    success: true,
    message: "Hello world"
  });
});
router.post("api/register", [(0, _expressValidator.check)("email", "Please provide a valid email").isEmail(), (0, _expressValidator.check)("password", "Please password must not be less than 6 characters").isLength({
  min: 6
}), (0, _expressValidator.check)("fullname", "Please enter your fullname").notEmpty()], _auth.register);
var _default = router;
exports.default = _default;