import { weekDays } from "../../helpers/constants";

function WeekDays() {
  return (
    <div className="grid grid-cols-7 grid-rows-1 gap-1 mb-1">
      {weekDays.map((day) => (
        <div key={day.key} className="flex justify-center">{day.value}</div>
      ))}
    </div>
  );
}

export default WeekDays;
