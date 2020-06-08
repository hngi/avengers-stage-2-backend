"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const user = new _mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please enter user full name"]
  },
  email: {
    type: String,
    required: [true, "Please specify user email"],
    unique: true
  },
  password: String,
  salt: String
});

var _default = (0, _mongoose.model)("User", user);

exports.default = _default;