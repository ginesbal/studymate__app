// src/App.tsx

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './src/components/navigation/BottomTabNavigator';
import {TaskProvider} from './src/context/TaskContext'; // Import TaskProvider

const App: React.FC = () => {
  return (
    <TaskProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;
