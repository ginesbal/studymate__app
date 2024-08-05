import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import TaskDetailScreen from '../../screens/TaskDetailScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import AddTaskScreen from '../../screens/AddTaskScreen';
import TaskListScreen from '../../screens/TaskListScreen';
import StudyTimerScreen from '../../screens/StudyTimerScreen';

const Stack = createStackNavigator();

// Customize the default theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#42A5F5',
  },
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{
          headerTintColor: 'blue', // Ensure the back button is blue
          headerTitleStyle: {color: 'black'}, // Title text color
        }}>
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TaskDetailScreen"
          component={TaskDetailScreen}
          options={{
            title: 'Task Details',
          }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddTaskScreen"
          component={AddTaskScreen}
          options={{
            title: 'Add Task',
          }}
        />
        <Stack.Screen
          name="TaskListScreen"
          component={TaskListScreen}
          options={{
            title: 'Task List',
          }}
        />
        <Stack.Screen
          name="StudyTimerScreen"
          component={StudyTimerScreen}
          options={{
            title: 'Study Timer',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
