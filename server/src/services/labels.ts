import { Label } from "@prisma/client";
import { prisma } from "..";

export class LabelsService {
  static getLabels = async (): Promise<Label[]> => {
    const labels = await prisma.label.findMany({
      orderBy: {
        color: "asc",
      },
    });

    return labels;
  };
}
