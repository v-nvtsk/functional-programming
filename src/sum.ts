// Функция сумматор.
// При вызове функции с аргументами она суммирует переданные значения
//
// (полезно прочитать про методы.valueOf и.toString)
// type wrapperFn = () => SumFn;

export type SumFn = (initialNumber?: number | undefined) => CurriedAddFn;
export type CurriedAddFn = (numberToAdd: number) => CurriedAddFn;

export function sum(initialNumber?: number): CurriedAddFn {
  // При первом запуске получаем либо один, либо ноль аргументов
  let acc = initialNumber ?? 0;

  // Последующие вызовы происходят с одним аргументом.
  const add: CurriedAddFn = (numberToAdd: number): CurriedAddFn => {
    acc += numberToAdd;
    return add;
  };

  add.valueOf = () => {
    const temp = acc;
    acc = initialNumber ?? 0;
    return temp;
  };
  add.toString = () => {
    const temp = acc;
    acc = initialNumber ?? 0;
    return String(temp);
  };

  return add;
}
