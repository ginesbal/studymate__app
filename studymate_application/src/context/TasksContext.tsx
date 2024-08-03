// src/context/TasksContext.tsx

import React, { createContext, useState, ReactNode } from 'react';
import { Task } from '../types';

interface TasksContextProps {
    tasks: Task[];
    addNewTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    setTasks: (tasks: Task[]) => void;
}

interface TasksProviderProps {
    children: ReactNode;
}

export const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addNewTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    const updateTask = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    return (
        <TasksContext.Provider value={{ tasks, addNewTask, updateTask, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
};
