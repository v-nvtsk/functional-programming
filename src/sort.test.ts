import { semverSort } from "./sort";

jest.spyOn(console, "log").mockImplementation(jest.fn());

describe("semverSort", () => {
  it("should be a function", () => {
    expect(semverSort).toBeInstanceOf(Function);
  });
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(jest.fn());
  });
  it("should return an array", () => {
    expect(semverSort(["1", "2", "3"])).toBeInstanceOf(Array);
  });

  const testData = [
    {
      input: ["4", "3", "1", "2", "3"],
      output: ["1", "2", "3", "3", "4"],
    },
    {
      input: ["1.0.5", "2.5.0", "0.12.0", "1", "1.23.45", "1.4.50", "1.2.3.4.5.6.7"],
      output: ["0.12.0", "1", "1.0.5", "1.2.3.4.5.6.7", "1.4.50", "1.23.45", "2.5.0"],
    },
    {
      input: ["1.0.5.4.3.2", "2.5.0.2.4.5", "0.12.0", "1", "1.23.45", "2.5.0.1.3", "1.2.3.4.5.6.7"],
      output: ["0.12.0", "1", "1.0.5.4.3.2", "1.2.3.4.5.6.7", "1.23.45", "2.5.0.1.3", "2.5.0.2.4.5"],
    },
  ];

  testData.forEach(({ input, output }) => {
    it(`should return right result`, () => {
      expect(semverSort(input)).toEqual(output);
    });
  });
});
