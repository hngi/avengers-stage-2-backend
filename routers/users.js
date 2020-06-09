const router = require("express").Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
} = require("../controllers/user.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

module.exports = router;
