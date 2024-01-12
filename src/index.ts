import { curry } from "./curry";

const func = (a: number, b: number, c: number, d: number, e: number): number => a + b + c + d + e;
const hof = curry(func);
console.log(hof(1, 2, 3, 4, 5)); // 15
console.log(hof(2, 3, 4)(5, 6)); // 20
console.log(hof(3, 4)(5, 6)(7)); // 25
console.log(hof(4, 5)(6)(7, 8)); // 30
console.log(hof(5)(6)(7)(8)(9)); // 35
