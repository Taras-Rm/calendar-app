import { CalendarDate } from "../types/calendar";

export enum Day {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export enum Month {
  January = 0,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export const weekDays = [
  {
    key: Day.Sunday,
    value: "Sunday",
  },
  {
    key: Day.Monday,
    value: "Monday",
  },
  {
    key: Day.Tuesday,
    value: "Tuesday",
  },
  {
    key: Day.Wednesday,
    value: "Wednesday",
  },
  {
    key: Day.Thursday,
    value: "Thursday",
  },
  {
    key: Day.Friday,
    value: "Friday",
  },
  {
    key: Day.Saturday,
    value: "Saturday",
  },
];

export const yearMonthes = [
  {
    key: Month.January,
    value: "January",
  },
  {
    key: Month.February,
    value: "February",
  },
  {
    key: Month.March,
    value: "March",
  },
  {
    key: Month.April,
    value: "April",
  },
  {
    key: Month.May,
    value: "May",
  },
  {
    key: Month.June,
    value: "June",
  },
  {
    key: Month.July,
    value: "July",
  },
  {
    key: Month.August,
    value: "August",
  },
  {
    key: Month.September,
    value: "September",
  },
  {
    key: Month.October,
    value: "October",
  },
  {
    key: Month.November,
    value: "November",
  },
  {
    key: Month.December,
    value: "December",
  },
];

export const getMonthByKey = (month: Month) => {
  const monthValue = yearMonthes.find((m) => m.key === month)?.value;

  if (!monthValue) {
    throw new Error("invalid month key");
  }

  return monthValue;
};

export const isSameCalendarDates = (
  date1: CalendarDate,
  date2: CalendarDate
): boolean => {
  return (
    date1.year === date2.year &&
    date1.month === date2.month &&
    date1.date === date2.date
  );
};

export const convertStringToCalendarDate = (date: string): CalendarDate => {
  const newDate = new Date(date);

  const resultDate: CalendarDate = {
    year: newDate.getFullYear(),
    month: newDate.getMonth(),
    date: newDate.getDate(),
    weekDay: newDate.getDay(),
  };

  return resultDate;
};

export const convertCalendarDateToString = (date: CalendarDate): string => {
  return new Date(Date.UTC(date.year, date.month, date.date))
    .toISOString()
    .split("T")[0];
};
