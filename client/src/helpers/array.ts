export function getIndices<T>(arr: T[], elem: T): number[] {
  let res: number[] = [];

  let index = arr.indexOf(elem);
  while (index != -1) {
    res.push(index);
    index = arr.indexOf(elem, index + 1);
  }

  return res;
}
