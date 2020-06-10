const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
require('dotenv').config()
const app = express()
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

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1', users);

//open the port
app.listen(process.env.PORT)
console.log('App listening on Port:' + process.env.PORT);
