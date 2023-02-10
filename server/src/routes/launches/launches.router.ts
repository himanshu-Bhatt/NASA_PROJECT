import express from "express";
import {
  getAllLaunches,
  postLaunch,
  abortLaunch,
} from "./launches.controller.js";
export const launchesRouter = express.Router();

launchesRouter.get("/", getAllLaunches);
launchesRouter.post("/", postLaunch);
launchesRouter.delete("/:id", abortLaunch);
