"use strict";

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = _http.default.createServer(_app.default);

const PORT = _config.default.PORT;
server.listen(PORT || 3050, () => {
  console.log(`Server listening on port ${PORT}`);
});