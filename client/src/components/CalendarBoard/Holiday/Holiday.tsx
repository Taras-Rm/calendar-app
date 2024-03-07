import { IHoliday } from "../../../types/holidays";

interface HolidayProps {
  holiday: IHoliday;
}

function Holiday({ holiday }: HolidayProps) {
  return (
    <div className="text-xs bg-green-700 text-white p-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap">
      {holiday.name}
    </div>
  );
}

export default Holiday;
