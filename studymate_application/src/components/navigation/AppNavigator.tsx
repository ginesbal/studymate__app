import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import TaskDetailScreen from '../../screens/TaskDetailScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import AddTaskScreen from '../../screens/AddTaskScreen';
import TaskListScreen from '../../screens/TaskListScreen';
import StudyTimerScreen from '../../screens/StudyTimerScreen';

// Create the stack navigator
const Stack = createStackNavigator();

// Customize the default theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#42A5F5',
    background: '#FFFFFF', // Ensure the background is white
    text: '#000000', // Ensure default text color is black
    border: '#E0E0E0', // Light grey border color
  },
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{
          headerTintColor: MyTheme.colors.primary, // Use theme primary color for back button
          headerTitleStyle: {color: MyTheme.colors.text}, // Use theme text color for title text
          headerStyle: {
            backgroundColor: MyTheme.colors.background, // Use theme background color for header
            borderBottomColor: MyTheme.colors.border, // Use theme border color for header border
            borderBottomWidth: 1,
          },
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
            headerStyle: {
              backgroundColor: MyTheme.colors.background,
              borderBottomColor: MyTheme.colors.border,
              borderBottomWidth: 1,
            },
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
            headerStyle: {
              backgroundColor: MyTheme.colors.background,
              borderBottomColor: MyTheme.colors.border,
              borderBottomWidth: 1,
            },
          }}
        />
        <Stack.Screen
          name="TaskListScreen"
          component={TaskListScreen}
          options={{
            title: 'Task List',
            headerStyle: {
              backgroundColor: MyTheme.colors.background,
              borderBottomColor: MyTheme.colors.border,
              borderBottomWidth: 1,
            },
          }}
        />
        <Stack.Screen
          name="StudyTimerScreen"
          component={StudyTimerScreen}
          options={{
            title: 'Study Timer',
            headerStyle: {
              backgroundColor: MyTheme.colors.background,
              borderBottomColor: MyTheme.colors.border,
              borderBottomWidth: 1,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
