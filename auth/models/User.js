import { Schema, model } from "mongoose";

const user = new Schema({
  fullname: {
    type: String,
    required: [true, "Please enter user full name"],
  },

  email: {
    type: String,
    required: [true, "Please specify user email"],
    unique: true,
  },

  password: String,

  salt: String,
});

module.exports = model("User", user);
