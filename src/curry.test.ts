import { curry } from "./curry";

describe("curry", () => {
  it("should be a function", () => {
    expect(curry).toBeInstanceOf(Function);
  });
  it("should return a function", () => {
    expect(curry((a: number, b: number, c: number, d: number, e: number): number => a + b + c + d + e)).toBeInstanceOf(
      Function,
    );
  });

  type Hof = (...args: number[]) => Hof;

  let hof: Hof;
  beforeEach(() => {
    const func = (a: number, b: number, c: number, d: number, e: number): number => a + b + c + d + e;
    hof = curry(func);
  });

  it("should return same values", () => {
    expect(hof(1, 2, 3, 4, 5)).toEqual(15);
    expect(hof(1)(2, 3, 4, 5)).toEqual(15);
    expect(hof(1, 2)(3, 4, 5)).toEqual(15);
    expect(hof(1, 2, 3)(4, 5)).toEqual(15);
    expect(hof(1, 2, 3, 4)(5)).toEqual(15);

    expect(hof(5, 6, 7, 8, 9)).toEqual(35);
    expect(hof(5)(6, 7, 8, 9)).toEqual(35);
    expect(hof(5, 6)(7, 8, 9)).toEqual(35);
    expect(hof(5, 6, 7)(8, 9)).toEqual(35);
    expect(hof(5, 6, 7, 8)(9)).toEqual(35);
  });

  it("should work", () => {
    expect(hof(1, 2, 3, 4, 5)).toEqual(15);
    expect(hof(2, 3, 4)(5, 6)).toEqual(20);
    expect(hof(3, 4)(5, 6)(7)).toEqual(25);
    expect(hof(4, 5)(6)(7, 8)).toEqual(30);
    expect(hof(5)(6)(7)(8)(9)).toEqual(35);
  });
});
