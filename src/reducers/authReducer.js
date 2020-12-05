import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_PENDING,
  AUTH_FAIL,
  SET_USER,
  CHANGE_PROFILE_SUCCESS,
} from '../actions/types';

const initialState = {
  pending: false,
  user: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_USER:
      return {...state, user: payload};
    case AUTH_PENDING:
      return {...state, pending: true};
    case AUTH_FAIL:
      return {...state, pending: false, user: null};
    case LOGIN_SUCCESS:
      return {...state, pending: false, user: payload};
    case LOGOUT_SUCCESS:
      return {...state, pending: false, user: null};
    case REGISTER_SUCCESS:
      return {...state, pending: false};
    case CHANGE_PROFILE_SUCCESS:
      return {...state, user: payload, pending: false};
    default:
      return state;
  }
};
