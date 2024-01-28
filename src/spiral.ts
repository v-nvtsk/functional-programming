/*
 * Функция разворачивает матрицу по спирали
 *
 */
export function spiral(arr: number[][]): number[] {
  const result = [];

  let rowStart = 0;
  let colStart = 0;
  let rowLast = arr.length - 1;
  let colLast = arr[0].length - 1;

  let num = arr.length * arr[0].length;

  while (num > 0) {
    for (let i = colStart; i <= colLast; i++) {
      result.push(arr[rowStart][i]);
      num -= 1;
    }
    rowStart += 1;

    for (let i = rowStart; i <= rowLast; i++) {
      result.push(arr[i][colLast]);
      num -= 1;
    }

    colLast -= 1;

    for (let i = colLast; i >= colStart; i--) {
      result.push(arr[rowLast][i]);
      num -= 1;
    }

    rowLast -= 1;

    for (let i = rowLast; i >= rowStart; i--) {
      result.push(arr[i][colStart]);
      num -= 1;
    }
    colStart += 1;
  }

  return result;
}
