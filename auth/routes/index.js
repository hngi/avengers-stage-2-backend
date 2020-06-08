import { Router } from "express";
import { register } from "../controllers/auth.controller";

const router = Router();

router.get("/hello", function (req, res) {
  return res.status(200).send({
    success: true,
    message: "Hello world",
  });
});

router.post("/register", register);

export default router;
