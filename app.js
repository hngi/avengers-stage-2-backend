const express = require('express')
const app = express()
const mongoose = require('mongoose')
const swaggerUI = require('swagger-ui-express');
const cors = require('cors')
const swaggerDocument = require('./docs/swagger.json');
require('dotenv').config()

//added cors after running npm install cors
const cors = require('cors')
app.use(cors())

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
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1', users);

//open the port
app.listen(process.env.PORT)