// src/types.ts
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Dashboard: undefined;
    TaskList: undefined;
    AddTask: { id?: string };
    TaskDetail: { id: string };
};

export type DashboardNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
export type TaskDetailRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;
export type TaskDetailNavigationProp = StackNavigationProp<RootStackParamList, 'TaskDetail'>;

export type AddTaskNavigationProp = StackNavigationProp<RootStackParamList, 'AddTask'>;
