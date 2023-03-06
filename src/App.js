import React from 'react';
import InternetChecker from './components/InternetChecker';
import AppNavigator from './routes';
import AppContextProvider from './Store';

const App = () => {
  return (
    <AppContextProvider>
      <AppNavigator />
      <InternetChecker />
    </AppContextProvider>
  );
};
export default App;
