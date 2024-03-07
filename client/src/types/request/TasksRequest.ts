import { ITask } from "../task";

export type GetTasksRequest = {
  year: number;
  month: number;
};

export type CreateTaskRequest = Omit<ITask, "id">;

export type UpdateTaskRequest = ITask;
