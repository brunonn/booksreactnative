import {firebase} from '../tools/network';

import {
  CHANGE_PROFILE_DATA_PENDING,
  CHANGE_PROFILE_DATA_SUCCESS,
  CHANGE_PROFILE_DATA_FAIL,
  GET_PROFILE_DATA_PENDING,
  GET_PROFILE_DATA_SUCCESS,
  GET_PROFILE_DATA_FAIL,
} from './types';

export const updateProfile = (userId, displayName) => async (dispatch) => {
  dispatch({
    type: CHANGE_PROFILE_DATA_PENDING,
  });

  const data = {
    displayName: displayName,
  };
  firebase
    .auth()
    .currentUser.updateProfile(data)
    .then(() => {
      dispatch({
        type: CHANGE_PROFILE_DATA_SUCCESS,
        payload: data,
      });
      console.log('Udało się uaktualnić profil');
    })
    .catch((err) => {
      dispatch({
        type: CHANGE_PROFILE_DATA_FAIL,
      });
      console.log('Nie udało się uaktualnić profilu');
    });
};

export const getDataProfile = () => async (dispatch) => {
  dispatch({
    type: GET_PROFILE_DATA_PENDING,
  });
  const user = await firebase.auth().currentUser;
  const data = {
    displayName: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL,
  };
  if (user != null) {
    dispatch({
      type: GET_PROFILE_DATA_SUCCESS,
      payload: data,
    });
  } else {
    dispatch({
      type: GET_PROFILE_DATA_FAIL,
    });
  }
};
