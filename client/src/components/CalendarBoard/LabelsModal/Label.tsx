import { ILabel } from "../../../types/label";

interface LabelProps {
  label: ILabel;
}
function Label({ label }: LabelProps) {
  return (
    <div className="flex space-x-3 items-center">
      <div
        className="rounded-full h-6 w-6"
        style={{ backgroundColor: label.color }}
      />
      <div>{label.text}</div>
    </div>
  );
}

export default Label;
