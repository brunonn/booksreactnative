import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {deleteBook} from '../../actions/booksActions';
import BookDetailsForm from '../../components/books/BookDetailsForm';
import {BookStackParams} from '../../navigation/NavigationParams';
import {RootState} from '../../reducers';

const BookDetailScreen = ({
  navigation,
  route,
}: StackScreenProps<BookStackParams, 'BookDetails'>) => {
  const dispatch = useDispatch();
  const book = useSelector(
    (state: RootState) => state.books.userBooks[route.params.bookId],
  );
  const deleteBookHandler = () => {
    dispatch(deleteBook(route.params.bookId));
    navigation.goBack();
  };
  return (
    <BookDetailsForm
      {...{book}}
      footer={
        <TouchableOpacity
          style={styles.deleteContainer}
          onPress={deleteBookHandler}>
          <Text style={styles.deleteText}>Remove book from your library</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  deleteText: {
    color: '#f11',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  deleteContainer: {
    marginTop: 20,
  },
});

export default BookDetailScreen;
