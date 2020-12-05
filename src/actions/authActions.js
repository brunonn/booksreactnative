import {firebase} from '../tools/network';
import {
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHENTICATION_PENDING,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
  SET_USERID_SUCCESS,
  SET_USERID_FAIL,
} from './types';

import {AsyncStorage} from 'react-native';

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_PENDING,
  });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      const userId = data.user.uid;
      AsyncStorage.setItem('userId', userId);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: userId,
      });
    })
    .catch(() => {
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const register = (email, password) => async (dispatch) => {
  dispatch({
    type: REGISTER_PENDING,
  });
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
    })
    .catch(() => {
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const logout = () => async (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    });
};

export const isSignedIn = () => async (dispatch) => {
  dispatch({
    type: AUTHENTICATION_PENDING,
  });
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: AUTHENTICATION_SUCCESS,
      });
    } else {
      dispatch({
        type: AUTHENTICATION_FAIL,
      });
    }
  });
};

export const setUserId = (userId) => async (dispatch) => {
  if (userId !== null) {
    dispatch({
      type: SET_USERID_SUCCESS,
      payload: userId,
    });
    return;
  }
  dispatch({
    type: SET_USERID_FAIL,
  });
};
