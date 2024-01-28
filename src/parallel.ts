/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/return-await */
// https://www.youtube.com/watch?v=-XccS5o_rvg

// Реализовать функцию параллельной потоковой обработки данных.
// В конструктор передается число параллельных "потоков", которое
// указывает сколько данных обрабатывается в конкретный момент времени

type Callback = (arg0: any) => void;
type TaskFunction = () => Promise<any>;

export class Parallel {
  private result: any[] = [];
  private activeJobsCounter: number = 0;
  private onReadycb: Callback | null = null;
  private readonly taskList: TaskFunction[] = [];

  constructor(private readonly jobsCount: number) {}
  public async jobs(...args: any[]): Promise<any> {
    const tasks = args;
    tasks.forEach((el: TaskFunction) => this.taskList.push(el));

    if (this.activeJobsCounter === 0) {
      for (let i = 0; i < this.jobsCount; i += 1) {
        this.runNewJob();
      }
    }

    return await this.getFinalResult();
  }

  private runNewJob(): void {
    if (this.taskList.length === 0) {
      if (this.activeJobsCounter === 0) {
        if (this.onReadycb !== null) {
          this.onReadycb(this.result);
          this.onReadycb = null;
          this.result = [];
        }
      }
      return;
    }
    const task = this.taskList.shift();
    if (task !== undefined) {
      this.activeJobsCounter += 1;
      task()
        .then((res: any) => {
          this.result.push(res);
        })
        .catch((err: Error) => {
          if (err !== null) console.error(err.message);
        })
        .finally(() => {
          this.activeJobsCounter -= 1;
          this.runNewJob();
        });
    }
  }

  private async getFinalResult(): Promise<[]> {
    return new Promise((resolve) => {
      this.onReadycb = resolve.bind(this.result);
    });
  }

  public getTaskCount(): number {
    return this.taskList.length;
  }

  public getActiveJobsCount(): number {
    return this.activeJobsCounter;
  }
}
