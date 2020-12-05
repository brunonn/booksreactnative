import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors, getColors} from '../../locales/colors';
import useDebounce from '../../hooks/useDebounce';
import Icon from 'react-native-vector-icons/FontAwesome';
import {bookRequest} from '../../api/books';

interface BookResult {
  authors: string[];
  title: string;
  uri: string;
}

interface BookSearchProps {
  onResultFound: (result: BookResult) => void;
}
const BookSearch = ({onResultFound}: BookSearchProps) => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef(null);

  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    const search = async () => {
      if (debouncedSearchText) {
        const res = await bookRequest(searchText);
        setResults(res);
      } else {
        setResults([]);
      }
    };
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  const handleInputFocus = () => {
    if (inputRef.current?.isFocused()) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          placeholder="Type in your book"
          style={styles.input}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />

        <TouchableOpacity style={styles.button} onPress={handleInputFocus}>
          <Icon name={'search'} color={Colors.orange} size={30} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.resultsContainer}
        keyboardShouldPersistTaps="handled">
        {results.map((item) => {
          return (
            <TouchableOpacity
              key={item.imageLinks?.thumbnail}
              style={{margin: 10}}
              onPress={() => {
                const book = {
                  title: item.title ?? null,
                  authors: item.authors ?? null,
                  uri: item.imageLinks?.thumbnail ?? null,
                };
                onResultFound(book);
                setResults([]);
                setSearchText('');
                inputRef.current?.blur();
              }}>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 250,
    height: 50,
    borderBottomColor: '#222',
    borderBottomWidth: 0.5,
    borderRadius: 5,
  },
  resultsContainer: {
    paddingHorizontal: 10,
  },
  button: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: getColors('orange'),
  },
});

export default BookSearch;
