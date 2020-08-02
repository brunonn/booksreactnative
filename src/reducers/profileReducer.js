import {
  CHANGE_PROFILE_DATA_SUCCESS,
  CHANGE_PROFILE_DATA_FAIL,
  CHANGE_PROFILE_DATA_PENDING,
  GET_PROFILE_DATA_SUCCESS,
  GET_PROFILE_DATA_FAIL,
  GET_PROFILE_DATA_PENDING,
} from '../actions/types';

const initialState = {
  successChange: null,
  changeImage: null,
  dataProfile: {},
  loadingProfileData: false,
  updatingProfile: false,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case CHANGE_PROFILE_DATA_PENDING:
      return {...state, updatingProfile: true};
    case CHANGE_PROFILE_DATA_SUCCESS:
      return {...state, successChange: true, updatingProfile: false};
    case CHANGE_PROFILE_DATA_FAIL:
      return {...state, successChange: false, updatingProfile: false};

    case GET_PROFILE_DATA_PENDING:
      return {...state, loadingProfileData: true};
    case GET_PROFILE_DATA_SUCCESS:
      return {...state, loadingProfileData: false, dataProfile: payload};
    case GET_PROFILE_DATA_FAIL:
      return {...state, loadingProfileData: false};
    default:
      return state;
  }
};
