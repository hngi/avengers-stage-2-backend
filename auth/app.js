import express from "express";
import cors from "cors";
import routes from "./routes";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

mongoose.connect(process.env.DATABASE_DEV_URL, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {
    console.log('Successful connection!');
})
.catch((e) => {
    console.log('Unsuccessful connection!!!');
    console.error(e);
})

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routes);


module.exports = app;


