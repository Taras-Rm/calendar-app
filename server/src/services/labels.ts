import { Label } from "@prisma/client";
import { prisma } from "..";

export type CreateLabel = {
  color: string;
  text: string;
};

export class LabelsService {
  static getLabels = async (): Promise<Label[]> => {
    const labels = await prisma.label.findMany({
      orderBy: {
        color: "asc",
      },
    });

    return labels;
  };

  static createLabel = async (label: CreateLabel): Promise<Label> => {
    const createdLabel = await prisma.label.create({
      data: {
        ...label,
      },
    });

    return createdLabel;
  };
}
