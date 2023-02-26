import {
  scheduleNewLaunch,
  _abortLaunch,
  getLaunch,
} from "./../../models/launches.model.js";
import { launchModel } from "../../models/launches.mongo.js";
import { Request, Response } from "express";
import { getPagination } from "../../services/query.js";

export const getAllLaunches = async (req: Request, res: Response) => {
  // console.log(req.query);

  const { skip, limit } = getPagination(req.query);
  // console.log(skip, limit);

  return res
    .status(200)
    .json(
      await launchModel
        .find({}, { _id: 0, __v: 0 })
        .sort({ flightNumber: 1 })
        .skip(skip)
        .limit(limit)
    );
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

  const res_launch = scheduleNewLaunch(launch);
  return res.status(201).json(res_launch);
};

export const abortLaunch = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  // console.log(req.params.id);

  const launch = await getLaunch(id);

  if (!launch) {
    //
    return res.status(404).json({
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
  const aborted = await _abortLaunch(id);
  if (!aborted) {
    return res.status(200).json({
      error: "Error occured while aborting",
    });
  }
  // console.log(aborted);

  return res.status(200).json({
    ok: true,
  });
};
