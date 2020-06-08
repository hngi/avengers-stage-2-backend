import express from "express";
import cors from "cors";
import routes from "./routes";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connection to db established"));

app.use("/api", routes);

module.exports = app;
