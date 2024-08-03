// src/navigation/AppNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import TaskDetailScreen from '../../screens/TaskDetailScreen'; // Import TaskDetailScreen
import EditProfileScreen from '../../screens/EditProfileScreen'; // Import EditProfileScreen
import AddTaskScreen from '../../screens/AddTaskScreen'; // Import AddTaskScreen
import TaskListScreen from '../../screens/TaskListScreen'; // Import TaskListScreen
import HomeScreen from '../../screens/HomeScreen'; // Import HomeScreen
import StudyTimerScreen from '../../screens/StudyTimerScreen'; // Import StudyTimerScreen

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
                <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
                <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
                <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
                <Stack.Screen name="StudyTimerScreen" component={StudyTimerScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
