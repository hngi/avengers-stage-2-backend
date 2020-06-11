const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const app = express();

// app.use(express.static(path.join(appRoot, './public')));
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json({ extended: true }));

app.use("/api", routes);
require('./startup/routes')(app);


module.exports = app;


