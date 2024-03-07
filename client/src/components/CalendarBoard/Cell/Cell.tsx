import { useState } from "react";
import { isSameCalendarDates } from "../../../helpers/constants";
import { CalendarDate, CalendarMonth } from "../../../types/calendar";
import { IHoliday } from "../../../types/holidays";
import Holiday from "../Holiday/Holiday";
import Task from "../Task/Task";
import CreateEditTask from "../CreateEditTask/CreateEditTask";
import { CreateTaskRequest } from "../../../types/request/TasksRequest";

interface CellProps {
  date: CalendarDate;
  today: CalendarDate;
  activeMonth: CalendarMonth;
  holidays: IHoliday[];
  handleCreateTask: (data: CreateTaskRequest) => void;
}

function Cell({
  date,
  today,
  activeMonth,
  holidays,
  handleCreateTask,
}: CellProps) {
  const isToday = isSameCalendarDates(date, today);

  const tasks: number[] = [];

  const [isCreateTask, setIsCreateTask] = useState(false);

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
      onClick={() => setIsCreateTask(!isCreateTask)}
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
      <div className="mb-1">
        {holidays.map((h) => (
          <Holiday holiday={h} />
        ))}
      </div>
      <div className="flex flex-col space-y-1 overflow-y-auto">
        {isCreateTask && (
          <CreateEditTask
            close={() => setIsCreateTask(false)}
            handleCreateTask={handleCreateTask}
            cellDate={date}
          />
        )}
        {tasks.map((t) => (
          <Task key={t} />
        ))}
      </div>
    </div>
  );
}

export default Cell;
