import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StyleSheet,
} from 'react-native';
import {login, register, logout} from '../../actions/authActions';
import {addBook} from '../../actions/booksActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getColors} from '../../colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

import BookSearch from '../../components/UI/BookSearch';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';

class CreateBookScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      authors: [],
      uri: '',
    };
  }
  addBookHandler = () => {
    const {userId, addBook, navigation} = this.props;
    const {title, authors, uri} = this.state;
    addBook(userId, title, authors, uri);
    this.setState({title: '', authors: [], uri: ''});
    navigation.navigate('Books');
  };
  render() {
    const {title, authors, uri} = this.state;
    const {navigation, pending} = this.props;
    if (pending) {
      return <Spinner />
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
          <View style={styles.topContainer}>
            <Text style={styles.topText}>Szukaj książki lub </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateOwn')}>
              <Text style={[styles.topText, {color: getColors('orange')}]}>
                dodaj własną książkę
              </Text>
            </TouchableOpacity>
          </View>
          <BookSearch
            
            onResultFound={(result) =>
              this.setState({
                title: result.title,
                authors: result.authors,
                uri: result.uri,
              })
            }
          />

          <View style={styles.container}>
            {title !== null && title !== undefined && title !== '' && (
              <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>{title}</Text>
                {authors &&
                  authors.length > 0 &&
                  authors.map((author, i) => <Text>{author}</Text>)}
                {uri && uri !== null && uri !== undefined && uri !== '' && (
                  <Image
                    source={{uri: uri}}
                    style={{width: 200, height: 200, resizeMode: 'contain'}}
                  />
                )}
              </View>
            )}
            <Button
              orange
              title="Dodaj książkę"
              onPress={() => this.addBookHandler()}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  topText: {
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
});

CreateBookScreen.propTypes = {
  userId: PropTypes.string,
  pending: PropTypes.bool.isRequired,
  addBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pending: state.books.pending,
  isAuth: state.auth.isAuth,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, {login, register, logout, addBook})(
  CreateBookScreen,
);
