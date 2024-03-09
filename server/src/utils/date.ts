export const convertToDate = (
  year: number,
  month: number,
  date: number
): Date => {
  return new Date(year, month, date);
};
