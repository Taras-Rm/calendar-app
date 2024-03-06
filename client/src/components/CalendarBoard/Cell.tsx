import { CalendarDate, CalendarMonth } from "../../helpers/calendar";

interface CellProps {
  date: CalendarDate;
  today: CalendarDate;
  activeMonth: CalendarMonth;
}

function Cell({ date, today, activeMonth }: CellProps) {
  return (
    <div
      className={`h-full ${
        date.year === today.year &&
        date.month === today.month &&
        date.date === today.date
          ? "bg-darkGray"
          : activeMonth.month !== date.month
          ? "bg-lightGray"
          : "bg-baseGray"
      } p-1`}
    >
      <div className="text-sm">{date.date}</div>
    </div>
  );
}

export default Cell;
