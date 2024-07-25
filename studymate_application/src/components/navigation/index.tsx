import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <BottomTabNavigator />
        </NavigationContainer>
    );
}

export default AppNavigator;
