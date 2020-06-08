import User from "../models/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`Error: ${errors}`);
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    console.log(`Calling the auth register endpoint with ${req.body}`);

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({ message: "Email already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    console.log("Hashing password");
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const prepareUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      salt: salt.toString(),
      password: hashedPassword,
    });

    const newUser = prepareUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(`Error: ${error}`);
    return next(error);
  }
};
