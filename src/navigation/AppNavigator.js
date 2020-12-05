import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {Spinner} from '../components/UI';
import {SET_USER} from '../actions/types';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => !!state.auth.userId);
  const pending = useSelector((state) => state.auth.pending);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) =>
      dispatch({type: SET_USER, payload: user}),
    );
    return subscriber;
  }, [dispatch]);

  if (pending) {
    return <Spinner />;
  }
  return (
    <NavigationContainer>
      {isAuth && <MainNavigator />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
