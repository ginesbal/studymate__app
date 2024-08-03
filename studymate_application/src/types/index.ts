// src/types/index.ts

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export enum ScreenNames {
    HomeScreen = 'HomeScreen',
    TaskDetailScreen = 'TaskDetailScreen',
    AddTaskScreen = 'AddTaskScreen',
    EditProfileScreen = 'EditProfileScreen',
    TaskListScreen = 'TaskListScreen',
    StudyTimerScreen = 'StudyTimerScreen',
}

export type RootStackParamList = {
    HomeScreen: undefined;
    TaskDetailScreen: { id: string };
    AddTaskScreen: { id?: string };
    EditProfileScreen: undefined;
    TaskListScreen: undefined;
    StudyTimerScreen: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

// Navigation prop types
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, ScreenNames.HomeScreen>;
export type TaskDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, ScreenNames.TaskDetailScreen>;
export type AddTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, ScreenNames.AddTaskScreen>;
export type EditProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, ScreenNames.EditProfileScreen>;
export type TaskListScreenNavigationProp = StackNavigationProp<RootStackParamList, ScreenNames.TaskListScreen>;
export type StudyTimerScreenNavigationProp = StackNavigationProp<RootStackParamList, ScreenNames.StudyTimerScreen>;

// Route prop types
export type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, ScreenNames.TaskDetailScreen>;
export type AddTaskScreenRouteProp = RouteProp<RootStackParamList, ScreenNames.AddTaskScreen>;

// Screen props
export type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
};

export type TaskDetailScreenProps = {
    navigation: TaskDetailScreenNavigationProp;
    route: TaskDetailScreenRouteProp;
};

export type AddTaskScreenProps = {
    navigation: AddTaskScreenNavigationProp;
    route: AddTaskScreenRouteProp;
};

export type EditProfileScreenProps = {
    navigation: EditProfileScreenNavigationProp;
};

export type TaskListScreenProps = {
    navigation: TaskListScreenNavigationProp;
};

export type StudyTimerScreenProps = {
    navigation: StudyTimerScreenNavigationProp;
};

export type Task = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    reminderTime: string;
    completed: boolean;
};
