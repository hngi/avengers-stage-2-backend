"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());

_mongoose.default.connect(_config.default.databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = _mongoose.default.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connection to db established"));
app.use("/api", _routes.default);
module.exports = app;