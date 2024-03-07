import { CalendarDate, CalendarMonth, MonthData } from "../types/calendar";
import { Day } from "./constants";

export class Calendar {
  private today: Date;

  constructor() {
    this.today = new Date();
  }

  // get current day data
  currentDay(): CalendarDate {
    const date: CalendarDate = {
      year: this.today.getFullYear(),
      month: this.today.getMonth(),
      date: this.today.getDate(),
      weekDay: this.today.getDay(),
    };

    return date;
  }

  // get ( previous | target | next ) month days
  getMonthPage(monthData: MonthData) {
    const targetMonth = this.month(monthData);

    const prevMonth = this.month(this.prevMonthData(monthData));

    const nextMonth = this.month(this.nextMonthData(monthData));

    for (let day of prevMonth.days.reverse()) {
      if (day.weekDay !== Day.Saturday) {
        targetMonth.days.unshift(day);
      } else {
        break;
      }
    }

    for (let day of nextMonth.days) {
      if (day.weekDay !== Day.Sunday) {
        targetMonth.days.push(day);
      } else {
        break;
      }
    }

    return targetMonth;
  }

  nextMonthData(currentMonth: MonthData): MonthData {
    const newMonth = currentMonth.month + 1 > 11 ? 0 : currentMonth.month + 1;
    const newYear = newMonth === 0 ? currentMonth.year + 1 : currentMonth.year;

    return {
      year: newYear,
      month: newMonth,
    };
  }

  prevMonthData(currentMonth: MonthData): MonthData {
    const newMonth = currentMonth.month - 1 >= 0 ? currentMonth.month - 1 : 11;
    const newYear = newMonth === 11 ? currentMonth.year - 1 : currentMonth.year;

    return {
      year: newYear,
      month: newMonth,
    };
  }

  // get month data (title, days) by year and month number
  private month(monthData: MonthData): CalendarMonth {
    const startDt = new Date(monthData.year, monthData.month);
    const endDt = new Date(monthData.year, monthData.month + 1);

    const days: CalendarDate[] = [];

    while (startDt < endDt) {
      const day: CalendarDate = {
        year: monthData.year,
        month: monthData.month,
        date: startDt.getDate(),
        weekDay: startDt.getDay(),
      };
      days.push(day);
      startDt.setDate(startDt.getDate() + 1);
    }

    const resultMonth: CalendarMonth = {
      year: monthData.year,
      month: monthData.month,
      days: days,
    };

    return resultMonth;
  }
}
