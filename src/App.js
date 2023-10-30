import React from 'react';
import {Provider} from 'react-redux';
import Navigator from './routes/Navigator';
import {store} from './redux/store';
import {Text} from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
