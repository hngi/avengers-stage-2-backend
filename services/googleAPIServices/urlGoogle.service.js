const {
  createConnection,
  getConnectionUrl
} = require("./config/googleAPIconfig.service");

module.exports = () => {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
};
