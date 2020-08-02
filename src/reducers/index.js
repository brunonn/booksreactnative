import {combineReducers} from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import booksReducer from './booksReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  books: booksReducer,
});
