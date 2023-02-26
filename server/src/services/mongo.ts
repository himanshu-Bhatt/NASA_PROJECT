import mongoose from "mongoose";

const MONGO_URL =
  process.env.MONGO_URL;
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
