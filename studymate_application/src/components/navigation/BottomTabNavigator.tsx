// src/navigation/BottomTabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../../screens/HomeScreen';
import TaskListScreen from '../../screens/TaskListScreen';
import StudyTimerScreen from '../../screens/StudyTimerScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: string;

                    switch (route.name) {
                        case 'HomeScreen':
                            iconName = 'home';
                            break;
                        case 'TaskListScreen':
                            iconName = 'list';
                            break;
                        case 'StudyTimerScreen':
                            iconName = 'timer';
                            break;
                        default:
                            iconName = 'circle';
                            break;
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#3A86FF',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="TaskListScreen" component={TaskListScreen} options={{ tabBarLabel: 'Tasks' }} />
            <Tab.Screen name="StudyTimerScreen" component={StudyTimerScreen} options={{ tabBarLabel: 'Timer' }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
