const express = require("express");
const router = express.Router();
const {
  urlGoogle,
  googleRedirect,
} = require("../controllers/google.controller");

router.get("/sign-in-with-google", urlGoogle);

router.post(Google.googleConfig.redirect, googleRedirect);

module.exports = router;
