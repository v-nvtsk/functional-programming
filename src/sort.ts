// Реализовать функцию, реализующую сортировку с учетом правил semver

function checkDigit(num: number | undefined): number {
  if (num === undefined) {
    return 0;
  }
  return num;
}

export function semverSort(arr: string[]): any[] {
  return arr
    .map((el: string): number[] => el.split(".").map(Number))
    .sort((a, b) => checkDigit(a[2]) - checkDigit(b[2]))
    .sort((a, b) => checkDigit(a[1]) - checkDigit(b[1]))
    .sort((a, b) => a[0] - b[0])
    .map((el) => String(el.join(".")));
}


