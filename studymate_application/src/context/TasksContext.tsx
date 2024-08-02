import React, {createContext, useState, ReactNode} from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  reminderTime: string;
  completed: boolean; // Add this property
}

type TasksContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const TasksProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <TasksContext.Provider value={{tasks, addTask, updateTask, deleteTask}}>
      {children}
    </TasksContext.Provider>
  );
};

export {TasksContext, TasksProvider};
