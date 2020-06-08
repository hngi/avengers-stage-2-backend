import http from "http";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(app);

server.listen(process.env.PORT || 3050, () => {
  console.log(`Server Listening on port ${process.env.PORT}`);
});
