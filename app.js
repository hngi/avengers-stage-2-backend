const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()

//Call in the routes
const users = require('./routers/users.route');

//DB Config
let db = process.env.MONGODB_URI;

//switch between docker image and atlas
//Please uncomment this to use to work for docker
if (process.env.DOCKER_DB) {
  db = process.env.DOCKER_DB;
}

//db connection
mongoose
  .connect(db, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected');
  })
  .catch((error) => {
    console.log(error);
  });

// Initializing express json Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', users.route);
app.use('/v1', users.router);

//open the port
app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
