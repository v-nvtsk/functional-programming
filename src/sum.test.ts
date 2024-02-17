import { sum } from "./sum";

describe("sum", () => {
  it("should be a function", () => {
    expect(sum).toBeInstanceOf(Function);
  });

  it("should return function", () => {
    expect(sum()).toBeInstanceOf(Function);
  });

  it("should return zero on empty init", () => {
    expect(String(sum())).toBe("0");
  });

  it("should return sum", () => {
    expect(+sum()).toBe(0);
    expect(Number(sum(1))).toBe(1);
    const s = sum();
    expect("" + String(s(1))).toBe("1");
    expect(+s(3)(4)(5)).toBe(12); // 12
    expect(sum(3)(4)(5).valueOf()).toBe(12);
    expect(sum(3)(4)(5).toString()).toBe("12");

    const s3 = sum(3);
    expect(+s3(5)).toBe(8); // 8
    expect(+s3(6)).toBe(9); // 9
  });
});
