import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StyleSheet,
} from 'react-native';
import {addBook} from '../../actions/booksActions';
import {useSelector, useDispatch} from 'react-redux';
import {getColors} from '../../locales/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

import BookSearch from '../../components/UI/BookSearch';
import {Button, Spinner} from '../../components/UI';

const CreateBookScreen = ({navigation}: any) => {
  const pending = useSelector((state: any) => state.books.pending);

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState([]);
  const [uri, setUri] = useState('');

  const dispatch = useDispatch();

  const addBookHandler = () => {
    dispatch(addBook(title, authors, uri));
    setTitle('');
    setAuthors([]);
    setUri('');
    navigation.navigate('Books');
  };

  if (pending) {
    return <Spinner />;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
        <View style={styles.topContainer}>
          <Text style={styles.topText}>Search for book or </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CreateOwn')}>
            <Text style={[styles.topText, {color: getColors('orange')}]}>
              add your own
            </Text>
          </TouchableOpacity>
        </View>
        <BookSearch
          onResultFound={(result) => {
            setTitle(result.title);
            setAuthors(result.authors);
            setUri(result.uri);
          }}
        />

        <View style={styles.container}>
          {!!title && (
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>{title}</Text>
              {authors?.length > 0 &&
                authors.map((author) => <Text>{author}</Text>)}
              {!!uri && (
                <Image
                  source={{uri: uri}}
                  style={{width: 200, height: 200, resizeMode: 'contain'}}
                />
              )}
            </View>
          )}
          <Button orange title="Add book" onPress={addBookHandler} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

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

export default CreateBookScreen;
