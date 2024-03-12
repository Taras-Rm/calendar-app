import { AxiosResponse } from "axios";
import { GetLabelsResponse } from "../types/response/LabelsResponse";
import { api } from "../http/api";

export class LabelsService {
  static async getLabels(): Promise<AxiosResponse<GetLabelsResponse>> {
    return api.get("labels");
  }
}
