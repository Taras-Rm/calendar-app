import { Day, Month } from "../helpers/constants";

export type CalendarDate = {
  year: number;
  month: Month;
  date: number;
  weekDay: Day;
};
