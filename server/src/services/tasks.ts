import { Task } from "@prisma/client";
import { prisma } from "..";
import { convertToDate } from "../utils/date";

export type CreateTask = {
  title: string;
  date: string;
};

export class TasksService {
  // get tasks by month
  static getTasks = async (year?: number, month?: number): Promise<Task[]> => {
    const now = new Date();

    // default - current month
    let startDate = convertToDate(now.getFullYear(), now.getMonth(), 1);
    let endDate = convertToDate(now.getFullYear(), now.getMonth(), 31);

    if (year && month) {
      startDate = convertToDate(year, month, 1);
      endDate = convertToDate(year, month, 31);
    }

    const tasks = await prisma.task.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return tasks;
  };

  static createTask = async (task: CreateTask): Promise<Task> => {
    const newDt = new Date(task.date);

    const createdTask = await prisma.task.create({
      data: {
        ...task,
        date: newDt,
        order: 1,
      },
    });

    return createdTask;
  };
}
