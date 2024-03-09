import { NextFunction, Request, Response } from "express";
import { TasksService } from "../services/tasks";

export class TasksController {
  static getTasks = async (
    req: Request<{}, {}, {}, { year?: number; month?: number }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { year, month } = req.query;

      const tasks = await TasksService.getTasks(year, month);

      res.send(tasks);
    } catch (error) {
      next(error);
    }
  };
}
