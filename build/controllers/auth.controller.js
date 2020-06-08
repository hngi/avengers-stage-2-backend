"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;

var _User = require("../models/User");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const register = async (req, res, next) => {
  try {
    console.log(`Calling the auth register endpoint with ${req.body}`);
    const user = await _User.User.findOne({
      email: req.body.email
    });

    if (user) {
      return res.status(409).json({
        message: "Email already exist"
      });
    }

    const salt = await _bcryptjs.default.genSalt(10);
    console.log("Hashing password");
    const hashedPassword = await _bcryptjs.default.hash(req.body.password, salt);
    const prepareUser = new _User.User({
      fullname: req.body.fullname,
      email: req.body.email,
      salt: salt.toString(),
      password: hashedPassword
    });
    const newUser = prepareUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(`Error: ${error}`);
    return next(error);
  }
};

exports.register = register;