import {
  launches,
  addNewLaunch,
  _abortLaunch,
} from "./../../models/launches.model.js";
import { Request, Response } from "express";

export const getAllLaunches = (req: Request, res: Response) => {
  return res.status(200).json(Array.from(launches.values()));
};

export const postLaunch = (req: Request, res: Response) => {
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);

  if (
    !launch.mission ||
    !launch.target ||
    !launch.launchDate ||
    !launch.rocket
  ) {
    return res.status(400).json({
      error: "Missing necessary launch properties",
    });
  }

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid date for the mission",
    });
  }

  const res_launch = addNewLaunch(launch);
  return res.status(201).json(res_launch);
};

export const abortLaunch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  // console.log(req.params.id);

  const launch = launches.get(id);

  if (isNaN(launch.launchDate)) {
    //
    return res.status(400).json({
      error: "Mission does not exist with this id",
    });
  }
  if (!launch.success) {
    //
    return res.status(400).json({
      error: "mission already failed",
    });
  }
  if (!launch.upcoming) {
    //
    return res.status(400).json({
      error: "mission already concluded",
    });
  }
  return res.status(200).json(_abortLaunch(id));
};
