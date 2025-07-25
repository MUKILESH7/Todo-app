import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { TaskProvider } from './src/context/TaskContext';

export default function App() {
  return (
    <PaperProvider>
      <TaskProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </TaskProvider>
    </PaperProvider>
  );
}
