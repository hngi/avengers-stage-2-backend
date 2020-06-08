"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = _dotenv.default.config();

if (!envFound) {
  throw new Error("Environment file not found!");
}

var _default = {
  // MongoDB URL connection string
  databaseURL: process.env.DB_URL
};
exports.default = _default;