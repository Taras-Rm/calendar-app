import axios, { AxiosResponse } from "axios";
import { GetHolidaysResponse } from "../types/response/HolidaysRequest";

export class HolidaysService {
  static async getHolidays(
    year: number
  ): Promise<AxiosResponse<GetHolidaysResponse>> {
    return axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/ua`);
  }
}
