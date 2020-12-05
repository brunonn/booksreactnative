import auth from '@react-native-firebase/auth';
import {
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_PENDING,
  AUTH_FAIL,
  CHANGE_PROFILE_SUCCESS,
} from './types';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (email, password) => async (dispatch) => {
  dispatch({type: AUTH_PENDING});
  try {
    const data = await auth().signInWithEmailAndPassword(email, password);
    const user = JSON.stringify(data.user);
    await AsyncStorage.setItem('user', user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
  } catch (error) {
    console.log('login error', error);
    dispatch({type: AUTH_FAIL});
  }
};

export const register = (email, password) => async (dispatch) => {
  dispatch({type: AUTH_PENDING});
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    dispatch({type: REGISTER_SUCCESS});
  } catch {
    dispatch({type: AUTH_FAIL});
  }
};

export const logout = () => async (dispatch) => {
  try {
    await auth().signOut();
    await AsyncStorage.clear();
    dispatch({type: LOGOUT_SUCCESS});
  } catch (error) {
    console.log(error);
    dispatch({type: AUTH_FAIL});
  }
};

export const updateProfile = (displayName) => async (dispatch) => {
  dispatch({type: AUTH_PENDING});
  const data = {displayName};
  try {
    await auth().currentUser.updateProfile(data);
    dispatch({
      type: CHANGE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch {
    dispatch({type: AUTH_FAIL});
  }
};
