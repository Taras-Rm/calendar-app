import { Task } from "@prisma/client";
import { prisma } from "..";

export class TasksService {
  static getTasks = async (year: number, month: number): Promise<Task[]> => {
    const startDate = new Date(
      `${year}-${month.toString().padStart(2, "0")}-${Number(1)
        .toString()
        .padStart(2, "0")}`
    );
    const endDate = new Date(
      `${year}-${month.toString().padStart(2, "0")}-${Number(31)}`
    );

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
}
