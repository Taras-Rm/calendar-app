import { ITask } from "../task";

export type GetTasksRequest = {
  year?: number;
  month?: number;
};

export type CreateTaskRequest = Omit<ITask, "id" | "order">;

export type UpdateTaskRequest = ITask;

export type ChangeTaskPosition = {
  date: string;
  order: number;
  taskId: number;
};
