// src/App.tsx

import React from 'react';
import AppNavigator from './src/components/navigation/AppNavigator';
import { TasksProvider } from './src/context/TasksContext';

const App: React.FC = () => {
    return (
        <TasksProvider>
            <AppNavigator />
        </TasksProvider>
    );
};

export default App;
