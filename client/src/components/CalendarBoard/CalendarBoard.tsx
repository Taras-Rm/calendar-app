import Cell from "./Cell";
import WeekDays from "./WeekDays";
import { useCalendar } from "../../hooks/useCalendar";
import { getMonthByKey } from "../../helpers/constants";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NavigationButton from "../NavigationButton/NavigationButton";

function CalendarBoard() {
  const { today, monthData, nextMonth, prevMonth } = useCalendar();

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
        <div className="flex justify-end flex-1">
          <NavigationButton>Month</NavigationButton>
        </div>
      </div>
      <WeekDays />
      <div className="grid grid-cols-7 grid-rows-6 gap-1 h-full">
        {monthData.days.map((d) => (
          <Cell
            date={d}
            today={today}
            activeMonth={monthData}
            key={`${d.month} ${d.date}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CalendarBoard;
