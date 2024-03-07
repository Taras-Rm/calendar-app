import Cell from "./Cell/Cell";
import WeekDays from "./WeekDays/WeekDays";
import { useCalendar } from "../../hooks/useCalendar";
import {
  convertDateToCalendarDate,
  getMonthByKey,
  isSameCalendarDates,
} from "../../helpers/constants";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NavigationButton from "../NavigationButton/NavigationButton";
import { HolidaysService } from "../../services/HolidaysService";
import { useQuery } from "@tanstack/react-query";

function CalendarBoard() {
  const { today, monthData, nextMonth, prevMonth } = useCalendar();

  const { data: { data: holidays = [] } = {} } = useQuery({
    queryKey: ["holidays", monthData?.year],
    queryFn: () => HolidaysService.getHolidays(monthData?.year || 0),
    enabled: !!monthData,
  });

  if (!monthData) {
    return;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-3">
        <div className="flex flex-1 space-x-2">
          <NavigationButton onClick={() => prevMonth()}>
            <FaChevronLeft />
          </NavigationButton>
          <NavigationButton onClick={() => nextMonth()}>
            <FaChevronRight />
          </NavigationButton>
        </div>
        <div className="flex justify-center flex-1 text-xl font-bold">
          <div className="mr-4">{monthData.year}</div>
          <div>{getMonthByKey(monthData.month)}</div>
        </div>
        <div className="flex-1"></div>
      </div>
      <WeekDays />
      <div className="grid grid-cols-7 gap-0.5 h-full">
        {monthData.days.map((d) => (
          <Cell
            date={d}
            today={today}
            activeMonth={monthData}
            key={`${d.month} ${d.date}`}
            holidays={holidays.filter((h) =>
              isSameCalendarDates(d, convertDateToCalendarDate(h.date))
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default CalendarBoard;
