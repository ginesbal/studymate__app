// src/navigation/StackNavigator.tsx

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen'; // Update import paths as needed
import TaskListScreen from '../../screens/TaskListScreen';
import TimerScreen from '../../screens/StudyTimerScreen';
import StudyTimerScreen from '../../screens/StudyTimerScreen';

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the header for all screens in this stack
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Tasks" component={TaskListScreen} />
      <Stack.Screen name="Timer" component={StudyTimerScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
