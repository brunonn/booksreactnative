import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHENTICATION_PENDING,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
  SET_USERID_SUCCESS,
  SET_USERID_FAIL,
} from '../actions/types';

const initialState = {
  pending: false,
  error: false,
  isAuth: false,
  userId: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOGIN_PENDING:
      return {...state, pending: true, error: false};
    case LOGIN_SUCCESS:
      return {...state, pending: false, error: false, userId: payload};
    case LOGIN_FAIL:
      return {...state, pending: false, error: true};
    case LOGOUT_SUCCESS:
      return {...state, pending: false, isAuth: false};
    case REGISTER_PENDING:
      return {...state, pending: true, error: false};
    case REGISTER_SUCCESS:
      return {...state, pending: false, error: false};
    case REGISTER_FAIL:
      return {...state, pending: false, error: true};
    case AUTHENTICATION_PENDING:
      return {...state, pending: true, error: false};
    case AUTHENTICATION_SUCCESS:
      return {...state, pending: false, isAuth: true};
    case AUTHENTICATION_FAIL:
      return {...state, pending: false, isAuth: false, error: true};
    case SET_USERID_SUCCESS:
      return {...state, userId: payload};
    case SET_USERID_FAIL:
      return {...state, userId: null};
    default:
      return state;
  }
};
