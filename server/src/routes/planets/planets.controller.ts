
import { Request, Response } from "express";
import { result as planets,getAllPlanets } from "../../models/planets.model.js";

export const httpGetAllPlanets = (req: Request, res: Response) => {
  return res.status(200).json(getAllPlanets());
};
