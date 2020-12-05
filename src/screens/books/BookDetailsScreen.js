import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button';
import {deleteBook} from '../../actions/booksActions';
import {getColors} from '../../locales/colors';

class BookDetailScreen extends React.Component {
  deleteBookHandler = () => {
    const {userId, deleteBook, navigation} = this.props;
    const {bookId} = this.props.route.params;
    deleteBook(userId, bookId);
    navigation.goBack();
  };
  render() {
    const {book} = this.props?.route?.params;
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
          <TouchableOpacity
            style={styles.deleteContainer}
            onPress={this.deleteBookHandler}>
            <Text style={styles.deleteText}>Usuń książkę</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

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

BookDetailScreen.propTypes = {
  userId: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
  deleteBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pending: state.books.pending,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, {deleteBook})(BookDetailScreen);
