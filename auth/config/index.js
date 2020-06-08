import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Environment file not found!");
}

export default {
  // MongoDB URL connection string
  databaseURL: process.env.DB_URL,
};
