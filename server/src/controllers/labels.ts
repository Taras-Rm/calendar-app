import { Request, Response, NextFunction } from "express";
import { LabelsService } from "../services/labels";

export class LabelsController {
  static getLabels = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const labels = await LabelsService.getLabels();

      res.send(labels);
    } catch (error) {
      next(error);
    }
  };
}
