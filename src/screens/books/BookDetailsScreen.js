import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {deleteBook} from '../../actions/booksActions';
import {getColors} from '../../locales/colors';

const BookDetailScreen = ({navigation, route}) => {
  const {book, bookId} = route?.params;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const deleteBookHandler = () => {
    dispatch(deleteBook(bookId));
    navigation.goBack();
  };
  return (
    <ScrollView style={{backgroundColor: getColors('white'), flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.authors}>
          {' '}
          {book.authors?.map((author, index) => {
            if (index === book.authors.length - 1) {
              return author;
            }
            return `${author}, `;
          })}
        </Text>

        <Image source={{uri: book?.uri}} style={styles.image} />
        <TouchableOpacity
          style={styles.deleteContainer}
          onPress={deleteBookHandler}>
          <Text style={styles.deleteText}>Remove book from your library</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    textAlign: 'center',
  },
  authors: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 300,
    marginTop: 5,
  },
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
