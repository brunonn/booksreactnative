import React, {useEffect, useState} from 'react';
import {View, StyleSheet, RefreshControl, FlatList} from 'react-native';
import {getUserBooks} from '../../actions/booksActions';
import {useSelector, useDispatch} from 'react-redux';

import BookItem from '../../components/UI/BookItem';
import Spinner from '../../components/UI/Spinner';

const BooksScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const pending = useSelector((state) => state.books.pending);
  const userBooks = useSelector((state) => state.books.userBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserBooks());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getUserBooks());
    setRefreshing(false);
  };

  if (pending) {
    return <Spinner />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={userBooks}
        renderItem={({item}) => (
          <BookItem
            title={item.title}
            authors={item.authors}
            source={{
              uri: item.uri
                ? item.uri
                : 'http://onlinebookclub.org/book-covers/id449795-125.jpg',
            }}
            onPress={() => {
              navigation.navigate('BookDetails', {
                book: item,
                bookId: item.id,
              });
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
