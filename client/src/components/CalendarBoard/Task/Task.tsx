import { MouseEvent } from "react";
import { ITask } from "../../../types/task";

interface TaskProps {
  task: ITask;
}

function Task({ task }: TaskProps) {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClick}
      className="bg-white text-xs p-1 rounded-md shadow-sm overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {task.title}
    </div>
  );
}

export default Task;
