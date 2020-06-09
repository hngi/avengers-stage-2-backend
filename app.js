const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

//Call in the routes
const users = require('./routers/users.route')

//DB Config
let db = process.env.MONGODB_URI

//switch between docker image and atlas
if (process.env.DOCKER_DB) {
  db = process.env.DOCKER_DB;
}

//db connection
mongoose
  .connect(db, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('connected')})
  .catch(error => {
    console.log(error);
  });

// Initializing express json Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//set base route for the service
app.use('/api/v1', users)

//open the port
app.listen(process.env.PORT)
