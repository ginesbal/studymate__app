import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type Task = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    reminderTime: string;
    completed: boolean;
};

export type RootStackParamList = {
    HomeScreen: { name: string };
    TaskListScreen: undefined;
    AddTaskScreen: { id?: string; onAddTask: (task: Task) => void };
    TaskDetailScreen: { id: string };
    HomeStack: undefined;
    TaskListStack: undefined;
    AddTaskStack: undefined;
    TimerStack: undefined;
    StudyTimerScreen: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
export type TaskDetailRouteProp = RouteProp<RootStackParamList, 'TaskDetailScreen'>;
export type TaskDetailNavigationProp = StackNavigationProp<RootStackParamList, 'TaskDetailScreen'>;
export type AddTaskNavigationProp = StackNavigationProp<RootStackParamList, 'AddTaskScreen'>;
export type StudyTimerNavigationProp = StackNavigationProp<RootStackParamList, 'StudyTimerScreen'>;
