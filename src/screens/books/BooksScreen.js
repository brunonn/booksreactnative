import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Image,
} from 'react-native';
import {getUserBooks} from '../../actions/booksActions';
import {getUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button';
import {getColors} from '../../colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BookItem from '../../components/UI/BookItem';
import Spinner from '../../components/UI/Spinner';

class BooksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }
  componentDidMount() {
    this.onRefresh();
  }
  onRefresh() {
    const {getUserBooks, userId} = this.props;
    getUserBooks(userId);
  }
  show() {
    console.log(this.props.userBooks);
  }
  render() {
    const {pending, userBooks, navigation} = this.props;
    if (pending) return <Spinner />;
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }>
          {userBooks.map((book, i) => {
            return (
              <View key={i}>
                <BookItem
                  title={book.title}
                  authors={book.authors}
                  source={{
                    uri: book.uri
                      ? book.uri
                      : 'http://onlinebookclub.org/book-covers/id449795-125.jpg',
                  }}
                  onPress={() => {
                    navigation.navigate('BookDetails', {
                      book: book,
                      bookId: book.id,
                    });
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

BooksScreen.propTypes = {
  getUserBooks: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  userBooks: PropTypes.array,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  pending: state.books.pending,
  userBooks: state.books.userBooks,
});

export default connect(mapStateToProps, {getUserBooks})(BooksScreen);
