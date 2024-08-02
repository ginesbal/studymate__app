import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../../screens/HomeScreen';
import TaskListScreen from '../../screens/TaskListScreen';
import AddTaskScreen from '../../screens/AddTaskScreen';
import StudyTimerScreen from '../../screens/StudyTimerScreen';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route: { name: string }, color: string, size: number) => {
    let iconName: string;

    switch (route.name) {
        case 'HomeScreen':
            iconName = 'home';
            break;
        case 'TaskListScreen':
            iconName = 'list';
            break;
        case 'AddTaskScreen':
            iconName = 'add-circle';
            break;
        case 'StudyTimerScreen':
            iconName = 'timer';
            break;
        default:
            iconName = 'circle';
    }

    return <Icon name={iconName} size={size} color={color} />;
};

const BottomTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, size),
                tabBarActiveTintColor: '#283618',
                tabBarInactiveTintColor: '#B7B7A4',
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabLabel,
            })}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen as React.ComponentType<any>} options={{ title: 'Home' }} />
            <Tab.Screen name="TaskListScreen" component={TaskListScreen} options={{ title: 'Task List' }} />
            <Tab.Screen name="AddTaskScreen" component={AddTaskScreen} options={{ title: 'Add Task' }} />
            <Tab.Screen name="StudyTimerScreen" component={StudyTimerScreen} options={{ title: 'Timer' }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#F0EFEB',
        borderTopWidth: 0,
        height: 60,
        paddingBottom: 10,
        paddingTop: 10,
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: '600',
    },
});

export default BottomTabNavigator;
