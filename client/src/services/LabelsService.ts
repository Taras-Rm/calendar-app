import { AxiosResponse } from "axios";
import { GetLabelsResponse } from "../types/response/LabelsResponse";
import { api } from "../http/api";
import { CreateLabelRequest } from "../types/request/LabelsRequest";

export class LabelsService {
  static async getLabels(): Promise<AxiosResponse<GetLabelsResponse>> {
    return api.get("labels");
  }

  static async createLabel(req: CreateLabelRequest): Promise<void> {
    return api.post("labels", {
      ...req,
    });
  }
}
