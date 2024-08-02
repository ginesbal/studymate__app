
import React from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './src/components/navigation/index';
import { TasksProvider } from './src/context/TasksContext';

const App: React.FC = () => {
  return (
    <TasksProvider>
      <AppNavigator />
    </TasksProvider>
  );
};

export default App;
