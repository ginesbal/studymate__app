import { Task } from '../types';

export const groupTasksByDate = (tasks: Task[]): { [key: string]: Task[] } => {
    return tasks.reduce((acc, task) => {
        const date = task.dueDate;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(task);
        return acc;
    }, {} as { [key: string]: Task[] });
};
