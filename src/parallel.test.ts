import { Parallel } from "./parallel";

describe("parallel", () => {
  it("should be a class", () => {
    expect(Parallel).toBeInstanceOf(Function);
  });

  it("should return new instance of Parallel", () => {
    expect(new Parallel(2)).toBeInstanceOf(Parallel);
  });

  it("Parallel.jobs should return a promise", () => {
    expect(
      new Parallel(2).jobs(
        async () => await new Promise((resolve) => setTimeout(resolve, 10, 1)),
        async () => await new Promise((resolve) => setTimeout(resolve, 50, 2)),
      ),
    ).toBeInstanceOf(Promise);
  });

  it("should return result of jobs", async () => {
    const result = await new Parallel(2).jobs(
      async () => await new Promise((resolve) => setTimeout(resolve, 10, 1)),
      async () => await new Promise((resolve) => setTimeout(resolve, 50, 2)),
    );
    expect(result).toEqual([1, 2]);
  });

  it("should return result of jobs", async () => {
    const result = await new Parallel(2).jobs(
      async () => await new Promise((resolve) => setTimeout(resolve, 50, 1)),
      async () => await new Promise((resolve) => setTimeout(resolve, 10, 2)),
    );
    expect(result).toEqual([2, 1]);
  });

  it("should return result of jobs", async () => {
    const result = await new Parallel(2).jobs(
      async () => await new Promise((resolve) => setTimeout(resolve, 10, 1)),
      async () => await new Promise((resolve) => setTimeout(resolve, 50, 2)),
      async () => await new Promise((resolve) => setTimeout(resolve, 20, 3)),
      async () => await new Promise((resolve) => setTimeout(resolve, 90, 4)),
      async () => await new Promise((resolve) => setTimeout(resolve, 30, 5)),
    );

    expect(result).toEqual([1, 3, 2, 5, 4]);
  });

  it("should return result of jobs", async () => {
    const result = await new Parallel(2).jobs(
      async () => await new Promise((resolve) => setTimeout(resolve, 10, 1)),
      async () => await new Promise((resolve) => setTimeout(resolve, 50, 2)),
      async () => await new Promise((resolve) => setTimeout(resolve, 20, 3)),
      async () => await new Promise((resolve) => setTimeout(resolve, 90, 4)),
      async () => await new Promise((resolve) => setTimeout(resolve, 30, 5)),
    );

    expect(result).toEqual([1, 3, 2, 5, 4]);
  });

});
