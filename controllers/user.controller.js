const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const regUser = require("../services/registerUser.service");
const signinUser = require("../services/loginUser.service");
const passwordReset = require("../services/resetPassword.service");
const resetInput = require("../services/reset.service");

exports.registerUser = async (req, res, next) => {
  try {
    const user = await regUser(req.body);
    res.status(200).send({ success: true, data: user });
  } catch (e) {
    res.status(400).send({ response: e.message });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const resObject = await signinUser(req.body);
    res.status(200).send(resObject);
  } catch (e) {
    res.status(400).send({ response: e.message });
  }
};

exports.checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const token = header.split(" ")[1];

    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
};

exports.authenticate = (req, res) => {
  jwt.verify(req.token, process.env.SECRET_TOKEN, async (err, userData) => {
    if (err) {
      res.status(401).json({ response: "Unauthorised access" });
    } else {
      const { email } = userData;
      try {
        let user = await User.findOne({ email });
        return res
          .status(200)
          .send({ success: true, userID: user._id, token: req.token });
      } catch (e) {
        res.status(401).json({ response: "Unauthorised access" });
      }
    }
  });
};

exports.resetPassword = async (req, res) => {
  try {
    await passwordReset(req.body, req.token);
    return res
      .status(200)
      .send({ success: true, response: "Password successfully reset" });
  } catch (e) {
    return res.status(400).send({ response: e.message });
  }
};

exports.reset = async (req, res) => {
  try {
    const resObject = await resetInput(req.body, req.headers);
    res.status(200).send(resObject);
  } catch (e) {
    return res.status(400).send({ response: e.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    await changePass(req.body, req.params.token);
    res.status(200).send({ success: true, response: "Password changed" });
  } catch (e) {
    return res.status(400).send({ response: e.message });
  }
};
