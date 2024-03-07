export type IHoliday = {
  date: Date;
  localName: string;
  name: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: number;
};
