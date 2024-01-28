/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/return-await */

import { curry } from "./curry";
import { Parallel } from "./parallel";
import { semverSort } from "./sort";
import { spiral } from "./spiral";
import { sum } from "./sum";

const func = (a: number, b: number, c: number, d: number, e: number): number => a + b + c + d + e;
const hof = curry(func);
console.log(hof(1, 2, 3, 4, 5)); // 15
console.log(hof(2, 3, 4)(5, 6)); // 20
console.log(hof(3, 4)(5, 6)(7)); // 25
console.log(hof(4, 5)(6)(7, 8)); // 30
console.log(hof(5)(6)(7)(8)(9)); // 35

console.log(+sum(0)); // 0;
const s = sum();
console.log("" + s(1)); // 1
console.log("" + s(1)(2)); // 3
console.log("" + s(3)(4)(5)); // 12
const s3 = sum(3);
console.log(+s3(5)); // 8
console.log(s3(6).toString()); // 9

const runner = new Parallel(2);

Promise.resolve(
  runner.jobs(
    async () => await new Promise((resolve) => setTimeout(resolve, 10, 1)),
    async () => await new Promise((resolve) => setTimeout(resolve, 50, 2)),
    async () => await new Promise((resolve) => setTimeout(resolve, 20, 3)),
    async () => await new Promise((resolve) => setTimeout(resolve, 90, 4)),
    async () => await new Promise((resolve) => setTimeout(resolve, 30, 5)),
  ),
).then((res) => {
  console.log("Final result: ", res);
  console.log("result should be: ", [1, 3, 2, 5, 4]);
});

console.log("semverSort: ");
console.log(semverSort(["1.0.5", "2.5.0", "0.12.0", "1", "1.23.45", "1.4.50", "1.2.3.4.5.6.7"]));
console.log("Result should be: ", ["0.12.0", "1", "1.0.5", "1.2.3.4.5.6.7", "1.4.50", "1.23.45", "2.5.0"]);

console.log("spiral:");
spiral([
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
]);
console.log("result should be: ", [0, 1, 2, 3, 4, 9, 14, 19, 18, 17, 16, 15, 10, 5, 6, 7, 8, 13, 12, 11]);
