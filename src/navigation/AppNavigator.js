import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {setUserId} from '../actions/authActions';

import {AsyncStorage} from 'react-native';

import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {Spinner} from '../components/UI';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => !!state.auth.userId);
  const pending = useSelector((state) => state.auth.pending);

  useEffect(() => {
    const _retrieveData = async () => {
      const value = await AsyncStorage.getItem('userId');
      if (value === null) {
        AsyncStorage.clear();
        return;
      }
      dispatch(setUserId(value));
    };
    _retrieveData();
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
