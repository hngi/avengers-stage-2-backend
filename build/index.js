"use strict";

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const server = _http.default.createServer(_app.default);

server.listen(process.env.PORT || 3050, () => {
  console.log(`Server Listening on port ${process.env.PORT}`);
});