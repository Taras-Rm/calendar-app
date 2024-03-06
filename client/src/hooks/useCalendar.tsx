import { useEffect, useState } from "react";
import { Calendar, CalendarMonth, MonthData } from "../helpers/calendar";

export const useCalendar = () => {
  // main calendar
  const calendar = new Calendar();

  // today day
  const today = calendar.currentDay();

  // store month number
  const [month, setMonth] = useState<MonthData>({
    year: today.year,
    month: today.month,
  });

  // month data
  const [monthData, setMonthData] = useState<CalendarMonth | null>(null);

  useEffect(() => {
    const monthData = calendar.getMonthPage({
      year: month.year,
      month: month.month,
    });
    setMonthData(monthData);
  }, [month, setMonth]);

  // next month
  const nextMonth = () => {
    setMonth(calendar.nextMonthNumber(month));
  };

  // previious month
  const prevMonth = () => {
    setMonth(calendar.prevMonthNumber(month));
  };

  return { today, monthData, nextMonth, prevMonth };
};
