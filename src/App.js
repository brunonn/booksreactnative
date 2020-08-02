import React from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from '../store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
