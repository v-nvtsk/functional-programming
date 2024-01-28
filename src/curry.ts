// Написать функцию для каррирования (https://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
// Пример использования функции

type Fn = (...args: any[]) => any;
type Hof = (...args: number[]) => Hof;

export function curry(fn: Fn): Hof {
  return function curried(...args: number[]): Hof {
    if (args.length >= fn.length) {
      return fn.apply(null, args);
    }
    return curried.bind(null, ...args);
  };
}
