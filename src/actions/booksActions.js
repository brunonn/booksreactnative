import {firebase} from '../tools/network';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

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
} from './types';

export const getUserBooks = (userId) => async (dispatch) => {
  dispatch({
    type: GET_USER_BOOKS_PENDING,
  });
  firebase
    .database()
    .ref('books/' + userId)
    .once('value')
    .then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      const values = Object.values(snapshot.val());
      values.forEach((item, index) => {
        item.id = keys[index];
      });
      dispatch({
        type: GET_USER_BOOKS_SUCCESS,
        payload: values,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_USER_BOOKS_FAIL,
      });
    });
};

export const addBook = (userId, title, authors, uri) => async (dispatch) => {
  dispatch({
    type: ADD_BOOK_PENDING,
  });

  // Get a key for a new Post.
  const newBookKey = firebase
    .database()
    .ref('books/' + userId)
    .push().key;

  firebase
    .database()
    .ref('books/' + userId + '/' + newBookKey)
    .set({
      title: title,
      authors: authors,
      uri: uri,
      id: newBookKey,
    })
    .then(() => {
      dispatch({
        type: ADD_BOOK_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_BOOK_FAIL,
      });
      console.log(err);
    });
};

export const addOwnBook = (userId, title, authors, imagePath) => async (
  dispatch,
) => {
  dispatch({
    type: ADD_BOOK_PENDING,
  });

  const uniqueId = uuidv4();
  console.log(uniqueId);
  const booksRef = firebase
    .storage()
    .ref()
    .child(`images/books/${userId}/${uniqueId}`);

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', imagePath, true);
    xhr.send(null);
  });
  console.log('putting file on storage');
  const snapshot = await booksRef.put(blob);
  console.log('file put');
  // We're done with the blob, close and release it
  blob.close();

  const downloadUri = await snapshot.ref.getDownloadURL();
  //done with image
  const newBookKey = await firebase
    .database()
    .ref('books/' + userId)
    .push().key;

  console.log('putting book item');
  try {
    const response = await firebase
      .database()
      .ref('books/' + userId + '/' + newBookKey)
      .set({
        title: title,
        authors: authors,
        uri: downloadUri,
        id: newBookKey,
      });
    dispatch({
      type: ADD_BOOK_SUCCESS,
    });
    console.log(response);
  } catch (err) {
    dispatch({
      type: ADD_BOOK_FAIL,
    });
  }
};

export const deleteBook = (userId, bookId) => async (dispatch) => {
  dispatch({type: DELETE_BOOK_PENDING});

  const bookRef = firebase.database().ref(`books/${userId}/${bookId}`);

  bookRef
    .set({})
    .then(() => {
      dispatch({
        type: DELETE_BOOK_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_BOOK_FAIL,
      });
      console.log(err);
    });
};

export const getAllBooks = (userId) => async (dispatch) => {
  dispatch({type: GET_ALL_BOOKS_PENDING});

  firebase
    .database()
    .ref('books')
    .once('value')
    .then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      const values = Object.values(snapshot.val());

      const books = [];
      values.forEach((data, index) => {
        const bookData = Object.values(data);
        bookData.forEach((book) => {
          const ownerId = keys[index];
          books.push({...book, ownerId: ownerId});
        });
      });

      dispatch({
        type: GET_ALL_BOOKS_SUCCESS,
        payload: books,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ALL_BOOKS_FAIL,
      });
    });
};
