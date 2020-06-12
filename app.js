const express = require("express");
const app = express();
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const swaggerDocument = require("./docs/swagger.json");
require("dotenv").config();

//Call in the routes
const users = require("./routers/users.route");

//DB Config
let db = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

//switch between docker image and atlas
//Please uncomment this to use to work for docker
if (process.env.DOCKER_DB) {
  db = process.env.DOCKER_DB;
}

//db connection
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Initializing express json Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/v1", users);

//open the port
app.listen(PORT, () => {
  console.log("Server Running on port", PORT);
});
