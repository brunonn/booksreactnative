import {
  GET_USER_BOOKS_PENDING,
  GET_USER_BOOKS_SUCCESS,
  GET_USER_BOOKS_FAIL,
  ADD_BOOK_PENDING,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAIL,
  GET_ALL_BOOKS_PENDING,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAIL,
  DELETE_BOOK_PENDING,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAIL,
} from '../actions/types';

const initialState = {
  userBooks: [],
  allBooks: [],
  loading: true,
  error: false,
  pending: false,
};
export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_USER_BOOKS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_USER_BOOKS_SUCCESS:
      return {
        ...state,
        pending: false,
        userBooks: payload,
      };
    case GET_USER_BOOKS_FAIL:
      return {
        ...state,
        pending: false,
        error: true,
      };
    case ADD_BOOK_PENDING:
      return {
        ...state,
        pending: true,
      };
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        pending: false,
      };
    case ADD_BOOK_FAIL:
      return {
        ...state,
        pending: false,
        error: true,
      };

    case GET_ALL_BOOKS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_ALL_BOOKS_SUCCESS:
      return {
        ...state,
        allBooks: payload,
        pending: false,
      };
    case GET_ALL_BOOKS_FAIL:
      return {
        ...state,
        pending: false,
        error: true,
      };
    case DELETE_BOOK_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        pending: false,
      };
    case DELETE_BOOK_FAIL:
      return {
        ...state,
        pending: false,
        error: true,
      };

    default:
      return state;
  }
};
