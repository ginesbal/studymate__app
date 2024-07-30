import React from 'react';
import 'react-native-gesture-handler'; // Ensure this import is at the very top
import AppNavigator from './src/components/navigation/index'; // Ensure this path is correct

const App: React.FC = () => {
  return <AppNavigator />;
};

export default App;
