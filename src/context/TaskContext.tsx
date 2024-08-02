// src/context/TaskContext.tsx

import React, {createContext, useState, ReactNode} from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  reminderTime: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TaskProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  return (
    <TaskContext.Provider value={{tasks, addTask}}>
      {children}
    </TaskContext.Provider>
  );
};

export {TaskProvider, TaskContext};
