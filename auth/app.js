import express from "express";
import cors from "cors";
import routes from "./routes";
const session = require("express-session");
const app = express();
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const parser = require("body-parser");


app.use(parser.urlencoded({extended: true}));

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(session({
    secret: "thisisourlittlesecret",
    resave: false,
    saveUninitialized: false
}));
  
app.use(passport.initialize());
app.use(passport.session());
  

module.exports = app;



