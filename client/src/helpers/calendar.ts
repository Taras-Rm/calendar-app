import { Day, Month } from "./constants";

export type CalendarDate = {
  year: number;
  month: Month;
  date: number;
  weekDay: Day;
};

export type CalendarMonth = {
  year: number;
  month: Month;
  days: CalendarDate[];
};

export class Calendar {
  private today: Date;

  constructor() {
    this.today = new Date();
  }

  // get current day data
  currentDay(): CalendarDate {
    const dt: CalendarDate = {
      year: this.today.getFullYear(),
      month: this.today.getMonth(),
      date: this.today.getDate(),
      weekDay: this.convertDay(this.today.getDay()),
    };

    return dt;
  }

  // get ( previous | target | next ) month days
  getMonthPage(year: number, month: number) {
    const targetMonth = this.month(year, month);

    let pMonth = this.prevMonthNumber(month);
    let pYear = pMonth === 11 ? year - 1 : year;
    const prevMonth = this.month(pYear, pMonth);

    let nMonth = this.nextMonthNumber(month);
    let nYear = nMonth === 0 ? year + 1 : year;
    const nextMonth = this.month(nYear, nMonth);

    const mth: CalendarMonth = {
      year: targetMonth.year,
      month: targetMonth.month,
      days: targetMonth.days,
    };

    for (let day of prevMonth.days.reverse()) {
      if (day.weekDay !== Day.Saturday) {
        mth.days.unshift(day);
      } else {
        break;
      }
    }

    for (let day of nextMonth.days) {
      if (day.weekDay !== Day.Sunday) {
        mth.days.push(day);
      } else {
        break;
      }
    }

    return mth;
  }

  nextMonthNumber(currentMonth: number): number {
    return currentMonth + 1 > 11 ? 0 : currentMonth + 1;
  }

  prevMonthNumber(currentMonth: number): number {
    return currentMonth - 1 >= 0 ? currentMonth - 1 : 11;
  }

  // get month data (title, days) by year and month number
  private month(year: number, month: number): CalendarMonth {
    const startDt = new Date(year, month);
    const endDt = new Date(year, month + 1);

    const days: CalendarDate[] = [];

    while (startDt < endDt) {
      const day: CalendarDate = {
        year: year,
        month: month,
        date: startDt.getDate(),
        weekDay: this.convertDay(startDt.getDay()),
      };
      days.push(day);
      startDt.setDate(startDt.getDate() + 1);
    }

    const mth: CalendarMonth = {
      year: year,
      month: month,
      days: days,
    };

    return mth;
  }

  // convert day number to string
  private convertDay(dayNum: number): Day {
    switch (dayNum) {
      case 0:
        return Day.Sunday;
      case 1:
        return Day.Monday;
      case 2:
        return Day.Tuesday;
      case 3:
        return Day.Wednesday;
      case 4:
        return Day.Thursday;
      case 5:
        return Day.Friday;
      case 6:
        return Day.Saturday;
    }

    throw new Error("invalid number of day");
  }
}
