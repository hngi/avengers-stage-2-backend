const router = require("express").Router();

const UserController = require("../controllers/user.controller");
const GoogleController = require("../controllers/google.controller");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post(
  "/reset-password",
  UserController.checkToken,
  UserController.resetPassword
);
router.get("/google/signin", GoogleController.urlGoogle);
router.get("/google/callback", GoogleController.getGoogleAccountFromCode);
router.post("/forget-password", UserController.reset);
router.post("/change-password/:token", UserController.changePassword);
router.post("/forgot-password", UserController.forgotPassword);

module.exports = router;
