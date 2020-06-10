const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const myRoute = require('./myRoutes/auth-routes');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config();
const keys=require('./config/keys');
require('./config/passport-setup');
const passport= require('passport');
// setting my routes
app.use('/auth', myRoute);
//Call in the routes
const users = require('./routers/users')
const PORT = 3000

//DB Config
const db = process.env.MONGODB_URI

//Mongoose Connect
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err))

 app.use(cookieSession({
    MaxAge:24*60*60*999999999999,
   keys:[keys.session.cookieKey]
 }));
//innitalising passport
 app.use(passport.initialize());
   app.use(passport.session());

// Initializing express json Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

let options = {
  //specify options
  host: `localhost:${PORT}`
}

app.use('/api/v1', users)

app.listen(PORT, () => {
  console.log('Server Running!!!!')
})
