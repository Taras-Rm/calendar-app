export type IHoliday = {
  date: string;
  localName: string;
  name: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: number;
};
