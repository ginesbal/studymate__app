import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import TaskDetailScreen from '../../screens/TaskDetailScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import AddTaskScreen from '../../screens/AddTaskScreen';
import TaskListScreen from '../../screens/TaskListScreen';
import StudyTimerScreen from '../../screens/StudyTimerScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="BottomTabs">
            <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TaskListScreen" component={TaskListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="StudyTimerScreen" component={StudyTimerScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
