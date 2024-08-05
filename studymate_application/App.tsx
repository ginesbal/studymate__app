import React from 'react';
import AppNavigator from './src/components/navigation/AppNavigator';
import { TasksProvider } from './src/context/TasksContext';
import { ThemeProvider } from './src/context/ThemeContext';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <TasksProvider>
                <AppNavigator />
            </TasksProvider>
        </ThemeProvider>
    );
};

export default App;
