import { Day, Month } from "../helpers/constants";

export type CalendarDate = {
  year: number;
  month: Month;
  date: number;
  weekDay: Day;
};

export type MonthData = {
  year: number;
  month: Month;
};

export type CalendarMonth = {
  year: number;
  month: Month;
  days: CalendarDate[];
};
