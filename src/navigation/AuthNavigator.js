import React from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import {Colors} from '../locales/colors';

const AuthStack = createStackNavigator();

const oldOptions = {
  title: null,

  headerStyle: {
    backgroundColor: Colors.background,
  },
  headerTintColor: Colors.white,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
