import { api } from "./routes/api.js";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import morgan from "morgan";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combine"));
app.use(express.json());
app.use("/v1", api);
