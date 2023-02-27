import * as dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";

const MONGO_URL =  process.env.m;
  
const PORT = 8000;

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
});
mongoose.connection.on("error", () => {
  console.error("Error while connecting to mongoDB");
});

export const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
};
