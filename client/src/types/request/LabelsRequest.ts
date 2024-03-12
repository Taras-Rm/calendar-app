import { ILabel } from "../label";

export type CreateLabelRequest = Omit<ILabel, "id">;
