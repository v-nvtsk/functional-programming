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
