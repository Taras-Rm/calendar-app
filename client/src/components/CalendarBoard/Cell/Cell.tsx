import { CalendarDate, CalendarMonth } from "../../../helpers/calendar";
import Task from "../Task/Task";

interface CellProps {
  date: CalendarDate;
  today: CalendarDate;
  activeMonth: CalendarMonth;
}

function Cell({ date, today, activeMonth }: CellProps) {
  const isToday =
    date.year === today.year &&
    date.month === today.month &&
    date.date === today.date;

  const tasks: number[] = [];

  const tasksCountText =
    tasks.length > 1
      ? `${tasks.length} cards`
      : tasks.length > 0
      ? `${tasks.length} card`
      : "";

  return (
    <div
      className={`flex flex-col ${
        isToday
          ? "bg-darkGray"
          : activeMonth.month !== date.month
          ? "bg-lightGray"
          : "bg-baseGray"
      } p-1`}
    >
      <div className="flex justify-between text-sm">
        <div
          className={`${activeMonth.month === date.month ? "font-bold" : ""}`}
        >
          {date.date}
        </div>
        {tasksCountText && (
          <div className="text-darkGray">{tasksCountText}</div>
        )}
      </div>
      <div className="flex flex-col space-y-1 overflow-y-auto">
        {tasks.map((t) => (
          <Task key={t} />
        ))}
      </div>
    </div>
  );
}

export default Cell;
