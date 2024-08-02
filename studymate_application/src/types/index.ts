import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  TaskListScreen: undefined;
  AddTaskScreen: {id?: string};
  TaskDetailScreen: {id: string};
  HomeStack: undefined;
  TaskListStack: undefined;
  AddTaskStack: undefined;
  StudyTimerScreen: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;
export type TaskDetailRouteProp = RouteProp<
  RootStackParamList,
  'TaskDetailScreen'
>;
export type TaskDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TaskDetailScreen'
>;
export type AddTaskNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddTaskScreen'
>;

// types.js
export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  reminderTime: string;
  completed: boolean;
};
