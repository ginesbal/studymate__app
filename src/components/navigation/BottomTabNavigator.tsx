// src/navigation/BottomTabNavigator.tsx

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../../screens/HomeScreen';
import TaskListScreen from '../../screens/TaskListScreen';
import AddTaskScreen from '../../screens/AddTaskScreen';
import TaskDetailScreen from '../../screens/TaskDetailScreen';
import StudyTimerScreen from '../../screens/StudyTimerScreen'; // Ensure this import is correct
import {RootStackParamList} from '../../types';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{title: 'Home'}}
    />
    <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
    <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
  </Stack.Navigator>
);

const TaskListStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
    <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
    <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
  </Stack.Navigator>
);

const AddTaskStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
  </Stack.Navigator>
);

const StudyTimerStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="StudyTimerScreen" component={StudyTimerScreen} />
  </Stack.Navigator>
);

const getTabBarIcon = (route: {name: string}, color: string, size: number) => {
  let iconName: string;

  switch (route.name) {
    case 'HomeStack':
      iconName = 'home';
      break;
    case 'TaskListStack':
      iconName = 'list';
      break;
    case 'AddTaskStack':
      iconName = 'add-circle';
      break;
    case 'StudyTimerStack':
      iconName = 'timer';
      break;
    default:
      iconName = 'circle'; // Default icon
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => getTabBarIcon(route, color, size),
        tabBarActiveTintColor: '#283618',
        tabBarInactiveTintColor: '#B7B7A4',
        tabBarStyle: {
          backgroundColor: '#F0EFEB',
        },
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="TaskListStack"
        component={TaskListStack}
        options={{title: 'Task List'}}
      />
      <Tab.Screen
        name="AddTaskStack"
        component={AddTaskStack}
        options={{title: 'Add Task'}}
      />
      <Tab.Screen
        name="StudyTimerStack"
        component={StudyTimerStack}
        options={{title: 'Study Timer'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
