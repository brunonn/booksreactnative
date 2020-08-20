import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {getUserBooks} from '../../actions/booksActions';
import {getUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.onRefresh();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
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
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
        />
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
