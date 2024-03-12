import { ILabel } from "../../../types/label";

interface LabelProps {
  label: ILabel;
}

function Label({ label }: LabelProps) {
  return (
    <div
      className={"rounded-md h-1.5 w-1/4"}
      style={{ backgroundColor: label.color }}
    />
  );
}

export default Label;
