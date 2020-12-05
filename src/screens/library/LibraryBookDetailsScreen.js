import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getColors} from '../../locales/colors';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addBook} from '../../actions/booksActions';

const LibraryBookDetails = (props) => {
  const {book} = props?.route?.params;
  const addBookHandler = () => {
    const {addBook, userId, navigation} = props;

    addBook(userId, book.title, book.authors, book.uri);
    navigation.navigate('Books', {
      screen: 'Books',
      initial: false,
    });
  };

  if (book === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nie znaleziono danej książki :(</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{backgroundColor: getColors('white'), flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.authors}>
          {' '}
          {book.authors?.map((author, index) => {
            if (index === book.authors.length - 1) return author;
            return `${author}, `;
          })}
        </Text>

        <Image source={{uri: book?.uri}} style={styles.image} />
        <TouchableOpacity style={styles.deleteContainer} onPress={() => {}}>
          <Text style={styles.deleteText}>
            Dodaj książkę do swojej kolekcji
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={addBookHandler}>
          <SimpleLineIcon name="plus" size={30} color={getColors('blue')} />
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
    color: '#333',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  deleteContainer: {
    marginTop: 20,
  },
});
LibraryBookDetails.propTypes = {
  userId: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
  addBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pending: state.books.pending,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, {addBook})(LibraryBookDetails);
