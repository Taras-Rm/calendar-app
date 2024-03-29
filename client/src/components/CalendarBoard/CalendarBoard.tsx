import Cell from "./Cell/Cell";
import WeekDays from "./WeekDays/WeekDays";
import { useCalendar } from "../../hooks/useCalendar";
import {
  convertStringToCalendarDate,
  getMonthByKey,
  isSameCalendarDates,
} from "../../helpers/constants";
import NavigationButton from "../NavigationButton/NavigationButton";
import { HolidaysService } from "../../services/HolidaysService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { TasksService } from "../../services/TasksService";
import { CreateTaskRequest } from "../../types/request/TasksRequest";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import LabelsModal from "./LabelsModal/LabelsModal";
import { useState } from "react";
import { Button } from "antd";

function CalendarBoard() {
  const queryClient = useQueryClient();
  const [isLabelsModalOpen, setIsLabelsModalOpen] = useState(false);

  const { today, monthData, nextMonth, prevMonth } = useCalendar();

  const { data: { data: holidays = [] } = {} } = useQuery({
    queryKey: ["holidays", monthData?.year],
    queryFn: () => HolidaysService.getHolidays(monthData?.year || 0),
    enabled: !!monthData,
  });

  const { data: { data: tasks = [] } = {} } = useQuery({
    queryKey: ["tasks", monthData?.year, monthData?.month],
    queryFn: () =>
      TasksService.getTasks({ year: monthData?.year, month: monthData?.month }),
    enabled: !!monthData,
  });

  const { mutate: createTaskMutation } = useMutation({
    mutationFn: TasksService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", monthData?.year, monthData?.month],
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const createTask = (data: CreateTaskRequest) => {
    createTaskMutation({ title: data.title, date: data.date });
  };

  const { mutate: changeTaskPositionMutation } = useMutation({
    mutationFn: TasksService.changeTaskPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", monthData?.year, monthData?.month],
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onDragEnd = (data: DropResult) => {
    if (!data.destination) return;

    changeTaskPositionMutation({
      taskId: Number(data.draggableId),
      date: data.destination.droppableId,
      order: data.destination.index,
    });
  };

  if (!monthData) {
    return;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-3">
        <div className="flex flex-1 space-x-2">
          <NavigationButton onClick={() => prevMonth()}>
            <LeftOutlined />
          </NavigationButton>
          <NavigationButton onClick={() => nextMonth()}>
            <RightOutlined />
          </NavigationButton>
        </div>
        <div className="flex justify-center flex-1 text-xl font-bold">
          <div className="mr-4">{monthData.year}</div>
          <div>{getMonthByKey(monthData.month)}</div>
        </div>
        <div className="flex-1 flex justify-end">
          <Button onClick={() => setIsLabelsModalOpen(true)}>Labels</Button>
        </div>
      </div>
      <WeekDays />
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className="grid grid-cols-7 gap-0.5 h-full"
          style={{ gridTemplateRows: "repeat(auto-fit, minmax(100px, 1fr))" }}
        >
          {monthData.days.map((d) => (
            <Cell
              date={d}
              today={today}
              activeMonth={monthData}
              holidays={holidays.filter((h) =>
                isSameCalendarDates(d, convertStringToCalendarDate(h.date))
              )}
              tasks={tasks.filter((t) =>
                isSameCalendarDates(d, convertStringToCalendarDate(t.date))
              )}
              createTask={createTask}
            />
          ))}
        </div>
      </DragDropContext>
      <LabelsModal
        isOpen={isLabelsModalOpen}
        close={() => setIsLabelsModalOpen(false)}
      />
    </div>
  );
}

export default CalendarBoard;
