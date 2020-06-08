import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { check } from "express-validator";

const router = Router();

router.get("/hello", function (req, res) {
  return res.status(200).send({
    success: true,
    message: "Hello world",
  });
});

router.post(
  "/register",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Please password must not be less than 6 characters"
    ).isLength({
      min: 6,
    }),
    check("fullname", "Please enter your fullname").notEmpty(),
  ],
  register
);

export default router;
