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
      orderBy: {
        order: "asc",
      },
      include: {
        labels: {
          select: {
            label: true,
          },
        },
      },
    });

    return tasks;
  };

  static createTask = async (task: CreateTask): Promise<Task> => {
    const targetDate = new Date(task.date);

    const lastTask = await prisma.task.findFirst({
      where: {
        date: targetDate,
      },
      orderBy: {
        order: "desc",
      },
    });

    const createdTask = await prisma.task.create({
      data: {
        ...task,
        date: targetDate,
        order: lastTask ? lastTask.order + 1 : 0,
      },
    });

    return createdTask;
  };

  static changePosition = async (
    taskId: number,
    date: string,
    order: number
  ): Promise<void> => {
    await prisma.$transaction(async (tx) => {
      const task = await tx.task.findUnique({
        where: {
          id: taskId,
        },
      });

      if (!task) {
        throw new Error("can not find task by provided id");
      }

      await tx.task.updateMany({
        where: {
          date: task.date,
          order: {
            gt: task.order,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      });

      const newToDate = new Date(date);

      await tx.task.updateMany({
        where: {
          date: newToDate,
          order: {
            gte: order,
          },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });

      await tx.task.update({
        where: {
          id: taskId,
        },
        data: {
          date: newToDate,
          order: order,
        },
      });
    });
  };
}
