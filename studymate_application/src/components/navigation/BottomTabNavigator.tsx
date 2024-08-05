import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../../screens/HomeScreen';
import TaskListScreen from '../../screens/TaskListScreen';
import StudyTimerScreen from '../../screens/StudyTimerScreen';
import { useTheme } from '../../context/ThemeContext';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: string;

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Tasks':
                            iconName = 'list';
                            break;
                        case 'Timer':
                            iconName = 'timer';
                            break;
                        default:
                            iconName = 'circle';
                            break;
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.primaryColor,
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: theme.backgroundColor },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="Tasks" component={TaskListScreen} options={{ tabBarLabel: 'Tasks' }} />
            <Tab.Screen name="Timer" component={StudyTimerScreen} options={{ tabBarLabel: 'Timer' }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
