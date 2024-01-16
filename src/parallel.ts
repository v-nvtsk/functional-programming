/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/return-await */
// https://www.youtube.com/watch?v=-XccS5o_rvg

// Реализовать функцию параллельной потоковой обработки данных.
// В конструктор передается число параллельных "потоков", которое
// указывает сколько данных обрабатывается в конкретный момент времени

/* 
  taskList=[task1,task2,task3,task4]

  Берем первые n задач и запускаем их
  Когда любое из них завершается - запрашиваем следующее задание

  Каждый таск - это функция. Её надо запустить и ждать разрешения(resolved).




*/

export class Parallel {
  private readonly result: any[] = [];
  private activeJobsCounter: number = 0;
  private onReadycb: any = () => {};

  constructor(private readonly jobsCount: number) {}
  public async jobs(...args: any[]): Promise<any> {
    const taskList = args;

    for (let i = 0; i < this.jobsCount; i += 1) {
      // console.log("create task", i + 1);
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

// const runner = new Parallel(2);

// Promise.resolve(
//   runner.jobs(
//     () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
//     () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
//     () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
//     () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
//     () => new Promise((resolve) => setTimeout(resolve, 30, 5)),
//   ),
// ).then((res) => {
//   console.log("Final result: ", res);
// });
// [1, 3, 2, 4, 5];
