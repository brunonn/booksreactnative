import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet, RefreshControl, FlatList} from 'react-native';
import {getUserBooks} from '../../actions/booksActions';
import {useSelector, useDispatch} from 'react-redux';

import BookItem from '../../components/UI/BookItem';
import {RootState} from '../../reducers';
import {StackScreenProps} from '@react-navigation/stack';
import {BookStackParams} from '../../navigation/NavigationParams';

const BooksScreen = ({
  navigation,
}: StackScreenProps<BookStackParams, 'Books'>) => {
  const pending = useSelector((state: RootState) => state.books.pending);
  const userBooksKeys = useSelector(
    (state: RootState) => state.books.userBooksKeys,
  );

  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getUserBooks());
  }, [dispatch]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <View style={styles.container}>
      <FlatList
        data={userBooksKeys}
        renderItem={({item: bookId}) => (
          <BookItem
            {...{bookId}}
            onPress={() => navigation.navigate('BookDetails', {bookId})}
          />
        )}
        keyExtractor={(item) => item}
        refreshControl={
          <RefreshControl refreshing={pending} onRefresh={getBooks} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default BooksScreen;
