import { NextFunction, Request, Response } from "express";
import { TasksService } from "../services/tasks";

export class TasksController {
  static getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(await TasksService.getTasks());
    } catch (error) {
      next(error);
    }
  };
}
