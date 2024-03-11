import { useState } from "react";
import { isSameCalendarDates } from "../../../helpers/constants";
import { CalendarDate, CalendarMonth } from "../../../types/calendar";
import { IHoliday } from "../../../types/holidays";
import Holiday from "../Holiday/Holiday";
import Task from "../Task/Task";
import CreateEditTask from "../CreateEditTask/CreateEditTask";
import { CreateTaskRequest } from "../../../types/request/TasksRequest";
import { ITask } from "../../../types/task";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { PlusOutlined } from "@ant-design/icons";

interface CellProps {
  date: CalendarDate;
  today: CalendarDate;
  activeMonth: CalendarMonth;
  holidays: IHoliday[];
  createTask: (data: CreateTaskRequest) => void;
  tasks: ITask[];
}

function Cell({
  date,
  today,
  activeMonth,
  holidays,
  createTask,
  tasks,
}: CellProps) {
  const isToday = isSameCalendarDates(date, today);
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex justify-between text-sm">
        <div
          className={`${activeMonth.month === date.month ? "font-bold" : ""}`}
        >
          {date.date}
        </div>
        {tasksCountText && (
          <div className="mb-1 text-gray-600">{tasksCountText}</div>
        )}
        {isHovered && !isCreateTask && (
          <PlusOutlined onClick={() => setIsCreateTask(!isCreateTask)} />
        )}
      </div>
      {holidays.length > 0 && (
        <div className="mb-1">
          {holidays.map((h) => (
            <Holiday holiday={h} key={h.name} />
          ))}
        </div>
      )}
      <Droppable
        isDropDisabled={isCreateTask}
        key={`${date.month} ${date.date}`}
        droppableId={`${date.month} ${date.date}`}
      >
        {(provided) => (
          <div
            className="flex flex-col space-y-1 overflow-y-auto h-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {isCreateTask && (
              <CreateEditTask
                close={() => setIsCreateTask(false)}
                createTask={createTask}
                cellDate={date}
              />
            )}
            {tasks.map((t, index) => (
              <Draggable
                key={t.id}
                draggableId={`${t.id}`}
                index={index}
                isDragDisabled={isCreateTask}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? "0.5" : "1",
                    }}
                  >
                    <Task task={t} key={t.id} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Cell;
