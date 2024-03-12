import { ILabel } from "./label";

export type ITask = {
  id: number;
  title: string;
  date: string;
  order: number;
  labels?: ITaskLabel[];
};

export type ITaskLabel = {
  label: ILabel;
};
