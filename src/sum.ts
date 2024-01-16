// Функция сумматор.
// При вызове функции с аргументами она суммирует переданные значения
//
// (полезно прочитать про методы.valueOf и.toString)
// type wrapperFn = () => SumFn;

export type SumFn = (...args: number[]) => any;

export function sum(...args: number[]): SumFn {
  const add: SumFn = (...args2: number[]): any => {
    return sum(...args, ...args2);
  };

  add.valueOf = () => {
    return args.reduce((acc: number, curr: number) => acc + curr, 0);
  };
  add.toString = () => {
    return String(args.reduce((acc: number, curr: number) => acc + curr, 0));
  };

  return add;
}
/* 
console.log(+sum(0)); // 0;
const s = sum();
console.log("" + s(1)); // 1
console.log("" + s(1)(2)); // 3
console.log("" + s(3)(4)(5)); // 12
const s3 = sum(3);
console.log(+s3(5)); // 8
console.log(s3(6).toString()); // 9
 */