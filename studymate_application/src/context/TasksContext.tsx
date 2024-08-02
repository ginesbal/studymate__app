import React, { createContext, useState, ReactNode } from 'react';
import { Task } from '../types';

interface TasksContextType {
    tasks: Task[];
    addNewTask: (task: Task) => void;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addNewTask = (newTask: Task) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    return (
        <TasksContext.Provider value={{ tasks, addNewTask, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
};
