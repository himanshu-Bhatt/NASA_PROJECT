import { Request, Response } from "express";
import { result as planets } from "../../models/planets.model.js";

export const getAllPlanets = (req: Request, res: Response) => {
  return res.status(200).json(planets);
};
