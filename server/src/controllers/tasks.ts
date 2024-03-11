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

  static createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, date } = req.body;

      const createdTask = await TasksService.createTask({ title, date });

      res.send(createdTask);
    } catch (error) {
      next(error);
    }
  };

  static changeTaskPosition = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { date, order } = req.body;
      const { id } = req.params;

      const createdTask = await TasksService.changePosition(
        Number(id),
        date,
        Number(order)
      );

      res.send(createdTask);
    } catch (error) {
      next(error);
    }
  };
}
