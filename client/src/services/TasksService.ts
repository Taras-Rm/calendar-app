import { AxiosResponse } from "axios";
import { api } from "../http/api";
import {
  ChangeTaskPosition,
  CreateTaskRequest,
  GetTasksRequest,
  UpdateTaskRequest,
} from "../types/request/TasksRequest";
import { GetTasksResponse } from "../types/response/TasksResponse";

export class TasksService {
  static async getTasks(
    req: GetTasksRequest
  ): Promise<AxiosResponse<GetTasksResponse>> {
    return api.get("tasks", {
      params: {
        year: req.year,
        month: req.month,
      },
    });
  }

  static async createTask(req: CreateTaskRequest): Promise<void> {
    return api.post("tasks", {
      ...req,
    });
  }

  static async updateTask(req: UpdateTaskRequest): Promise<void> {
    const { id, ...body } = req;

    return api.put(`tasks/${id}`, {
      ...body,
    });
  }

  static async deleteTask(id: number): Promise<void> {
    return api.delete(`tasks/${id}`);
  }

  static async changeTaskPosition(req: ChangeTaskPosition): Promise<void> {
    const { taskId, ...body } = req;

    return api.put(`tasks/${taskId}/position`, {
      ...body,
    });
  }
}
