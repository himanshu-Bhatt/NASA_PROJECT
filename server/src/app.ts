import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { planetsRouter } from "./routes/planets/planets.router.js";
import { launchesRouter } from "./routes/launches/launches.router.js";
import morgan from "morgan";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combine"));
app.use(express.json());
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);
