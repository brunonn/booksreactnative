import {combineReducers} from 'redux';

import authReducer from './authReducer';
import booksReducer from './booksReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
