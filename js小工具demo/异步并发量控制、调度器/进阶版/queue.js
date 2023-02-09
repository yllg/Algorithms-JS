/**
 * Queue 所需的 task 实例
 * excute 返回 Promsie 必须项
 * id 为 Symbol 必须项
 * cancel 非必须项
 */
class Task {
  constructor(options) {
    this.excute = options.excute;
    this.id = options.id;
    this.cancel =
      options.cancel ||
      (() => {
        return Promise.resolve();
      });
  }
  GetId() {
    return this.id;
  }
}

/**
 * Queue 可取消的执行队列
 * maxRunningNum 同时执行的最大项次数
 */
class Queue {
  constructor(options) {
    this.tasks = [];
    this.runningTasks = [];
    this.maxRunningNum = options?.maxRunningNum ?? 1;
  }

  AddTask(task) {
    this.tasks.push(task);
    this.Run();
  }
  RemoveTaskById(id) {
    const taskIndex = this.tasks.findIndex((task) => {
      return task.GetId() === id;
    });
    if (taskIndex <= -1) {
      return;
    }
    this.tasks.splice(taskIndex, 1);
    this.Run();
  }
  Run() {
    const taskLength = this.tasks && this.tasks.length;
    if (taskLength > 200) {
      LoggerManager.getInstance().warn(
        `Queue task lenght is greater than 200, length is ${taskLength}`
      );
    }
    while (
      this.runningTasks.length < this.maxRunningNum &&
      this.tasks.length > 0
    ) {
      const runTask = this.tasks.shift();
      this.runningTasks.push(runTask);
      runTask
        .excute()
        .catch((error) => {
          LoggerManager.getInstance().error(
            `${runTask.GetId()} running error ${
              (error && error.message) || ''
            } ${(error && error.stack) || ''}`
          );
        })
        .finally(() => {
          const index = this.runningTasks.findIndex((task) => {
            task.GetId() === runTask.GetId();
          });
          this.runningTasks.splice(index, 1);
          this.Run();
        });
    }
  }
  FindTaskById(id) {
    return this.tasks.find((task) => {
      return task.GetId() === id;
    });
  }
  async Clear() {
    this.tasks = [];
    while (this.runningTasks.length > 0) {
      const first = this.runningTasks.shift();
      if (first.cancel) {
        await first.cancel();
      }
    }
  }
}

// export default {
//   Task,
//   Queue,
// };
