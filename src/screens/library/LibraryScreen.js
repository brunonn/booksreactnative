import React, {Component} from 'react';
import {
  Text,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import {getColors} from '../../colors';
import {Input} from 'react-native-elements';
import {getAllBooks} from '../../actions/booksActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BookItem from '../../components/UI/BookItem';

class LibraryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {booksFound: []};
  }
  componentDidMount() {
    const {getAllBooks} = this.props;
    getAllBooks();
  }
  searchBooksHandler = (term) => {
    const noLetters = ['', '(', ')'];
    for (letter of noLetters) {
      if (term.includes('(')) return;
    }

    const {allBooks} = this.props;
    const booksFound = allBooks
      .filter((book) => book.title.toLowerCase().match(term.toLowerCase()))
      .map((book) => {
        return book;
      });
    this.setState({booksFound});
  };
  renderHeader = () => (
    <View style={styles.header}>
      <Text>Szukaj książek innych użytkowników </Text>
      <Input
        onChangeText={(text) => this.searchBooksHandler(text)}
        rightIcon={{
          type: 'font-awesome',
          name: 'search',
          color: getColors('orange'),
        }}
      />
    </View>
  );
  renderBook = (item) => {
    return (
      <TouchableOpacity style={styles.bookContainer}>
        <Image source={{uri: item?.uri}} style={{width: 100, height: 150}} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.authors}>{item?.authors}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const {allBooks} = this.props;
    const {booksFound} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={booksFound.length > 0 ? booksFound : allBooks}
          ListHeaderComponent={this.renderHeader()}
          renderItem={({item}) => this.renderBook(item)}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: getColors('white')},
  header: {margin: 20},
  bookContainer: {
    flex: 1,
    padding: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  title: {color: getColors('font'), fontFamily: 'Poppins-Medium'},
  authors: {color: getColors('lightFont'), fontFamily: 'Poppins-Regular'},
});

LibraryScreen.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  allBooks: PropTypes.array,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  pending: state.books.pending,
  allBooks: state.books.allBooks,
});

export default connect(mapStateToProps, {getAllBooks})(LibraryScreen);
