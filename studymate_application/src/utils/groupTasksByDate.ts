import {Task} from '../types';

export const groupTasksByDate = (tasks: Task[]) => {
  const groupedTasks: {[date: string]: Task[]} = {};

  tasks.forEach(task => {
    const date = task.dueDate;
    if (!groupedTasks[date]) {
      groupedTasks[date] = [];
    }
    groupedTasks[date].push(task);
  });

  return groupedTasks;
};
