/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/return-await */
// https://www.youtube.com/watch?v=-XccS5o_rvg

// Реализовать функцию параллельной потоковой обработки данных.
// В конструктор передается число параллельных "потоков", которое
// указывает сколько данных обрабатывается в конкретный момент времени

export class Parallel {
  private readonly result: any[] = [];
  private activeJobsCounter: number = 0;
  private onReadycb: any = () => {};

  constructor(private readonly jobsCount: number) {}
  public async jobs(...args: any[]): Promise<any> {
    const taskList = args;

    for (let i = 0; i < this.jobsCount; i += 1) {
      const task = taskList.shift();
      const promise = new Promise((resolve, reject) => {
        task().then((res: any) => {
          this.result.push(res);
          resolve(res);
        });
      });
      this.activeJobsCounter += 1;
      promise.then(() => {
        this.activeJobsCounter -= 1;
        this.runNewJob(taskList);
      });
    }

    return await this.getResult();
  }

  private async getResult(): Promise<[]> {
    return new Promise((resolve) => {
      this.onReadycb = resolve.bind(this.result);
    });
  }

  private runNewJob(taskList: any[]): void {
    if (taskList.length === 0) {
      if (this.activeJobsCounter === 0) {
        this.onReadycb(this.result);
      }
      return;
    }
    const task = taskList.shift();
    const promise = new Promise((resolve, reject) => {
      this.activeJobsCounter += 1;
      task().then((res: any) => {
        this.result.push(res);
        resolve(res);
      });
    });
    promise.then(() => {
      this.activeJobsCounter -= 1;
      this.runNewJob(taskList);
    });
  }
}
