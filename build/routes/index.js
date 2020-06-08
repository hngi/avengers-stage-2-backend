"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = require("../controllers/auth.controller");

const router = (0, _express.Router)();
router.get("/hello", function (req, res) {
  return res.status(200).send({
    success: true,
    message: "Hello world"
  });
});
router.post("/register", _auth.register);
var _default = router;
exports.default = _default;