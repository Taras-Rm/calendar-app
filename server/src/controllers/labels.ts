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

  static createLabel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { color, text } = req.body;

      const createdLabel = await LabelsService.createLabel({ color, text });

      res.send(createdLabel);
    } catch (error) {
      next(error);
    }
  };
}
