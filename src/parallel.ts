/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/return-await */
// https://www.youtube.com/watch?v=-XccS5o_rvg

// Реализовать функцию параллельной потоковой обработки данных.
// В конструктор передается число параллельных "потоков", которое
// указывает сколько данных обрабатывается в конкретный момент времени

type Callback = (arg0: any) => void;

export class Parallel {
  private readonly result: any[] = [];
  private activeJobsCounter: number = 0;
  private onReadycb: Callback | null = null;

  constructor(private readonly jobsCount: number) {}
  public async jobs(...args: any[]): Promise<any> {
    const taskList = args;

    for (let i = 0; i < this.jobsCount; i += 1) {
      this.runNewJob(taskList);
    }
    return await this.getFinalResult();
  }

  private runNewJob(taskList: any[]): void {
    if (taskList.length === 0) {
      if (this.activeJobsCounter === 0) {
        if (this.onReadycb !== null) this.onReadycb(this.result);
      }
      return;
    }
    const task = taskList.shift();
    new Promise((resolve) => {
      this.activeJobsCounter += 1;
      task()
        .then((res: any) => {
          this.result.push(res);
          resolve(res);
        })
        .catch(() => {
          resolve(null);
        });
    }).then(() => {
      this.activeJobsCounter -= 1;
      this.runNewJob(taskList);
    });
  }

  private async getFinalResult(): Promise<[]> {
    return new Promise((resolve) => {
      this.onReadycb = resolve.bind(this.result);
    });
  }
}
