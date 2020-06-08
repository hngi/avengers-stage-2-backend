import http from "http";
import app from "./app";
import config from "./config";

const server = http.createServer(app);
const PORT = config.PORT;

server.listen(PORT || 3050, () => {
  console.log(`Server listening on port ${PORT}`);
});
