import { CronJob } from "cron";

export interface Task {
  id: string;
  cronExpression: string;
  action: () => Promise<void>;
}

class Scheduler {
  private tasks: Map<string, { job: CronJob; isRunning: boolean }>;
  private isRunning: boolean;

  constructor() {
    this.tasks = new Map();
    this.isRunning = false;
  }

  start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.tasks.forEach(({ job }) => job.start());
    }
  }

  stop(): void {
    if (this.isRunning) {
      this.isRunning = false;
      this.tasks.forEach(({ job }) => job.stop());
    }
  }

  addTask(task: Task): void {
    const wrappedAction = async () => {
      const taskInfo = this.tasks.get(task.id);
      if (taskInfo && taskInfo.isRunning) {
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `Task ${task.id} is still running. Skipping this execution.`
          );
        }
        return;
      }

      if (taskInfo) {
        taskInfo.isRunning = true;
      }

      try {
        await task.action();
      } finally {
        if (taskInfo) {
          taskInfo.isRunning = false;
        }
      }
    };

    const job = new CronJob(task.cronExpression, wrappedAction);
    this.tasks.set(task.id, { job, isRunning: false });
    if (this.isRunning) {
      job.start();
    }
  }

  removeTask(taskId: string): void {
    const taskInfo = this.tasks.get(taskId);
    if (taskInfo) {
      taskInfo.job.stop();
      this.tasks.delete(taskId);
    }
  }

  getTasks(): Array<{ id: string; job: CronJob; isRunning: boolean }> {
    return Array.from(this.tasks.entries()).map(([id, { job, isRunning }]) => ({
      id,
      job,
      isRunning,
    }));
  }
}

export { Scheduler };

declare global {
  // eslint-disable-next-line no-var
  var scheduler: Scheduler | undefined;
}

const scheduler = globalThis.scheduler ?? new Scheduler();

if (process.env.NODE_ENV !== "production") globalThis.scheduler = scheduler;

export { scheduler };
