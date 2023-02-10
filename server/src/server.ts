import http from "http";
import mongoose from "mongoose";
// const http = require("http");
// const _app = require("./app.ts");
import { app } from "./app.js";
import { loadPlanets } from "./models/planets.model.js";
// import "REQUEST,RESPONSE" from "@types/express";

// import { app as _app } from "./app";
const MONGO_URL =
  "mongodb+srv://himanshu123:himanshu123@cluster0.9nbnp5o.mongodb.net/?retryWrites=true&w=majority";
const PORT = 8000;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
});
mongoose.connection.on("error", () => {
  console.error("Error while connecting to mongoDB");
});
async function startServer() {
  mongoose.connect(MONGO_URL);
  await loadPlanets();
  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}
startServer();
