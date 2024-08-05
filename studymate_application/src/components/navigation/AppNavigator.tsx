import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
        <NavigationContainer>
            <Stack.Navigator initialRouteName="BottomTabs">
                <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
                <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
                <Stack.Screen name="StudyTimerScreen" component={StudyTimerScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
