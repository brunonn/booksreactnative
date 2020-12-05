import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {getColors} from '../../locales/colors';
class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchText: '',
      searchUri: '',
      listShown: true,
    };
  }

  bookRequest(searchText) {
    if (searchText.length === 0) {
      return;
    }
    //change spaces to +
    const changedSearch = searchText.replace(/\s/g, '+');

    axios
      .get('https://www.googleapis.com/books/v1/volumes?q=' + changedSearch)
      .then((res) => {
        if (res.data.items) {
          var result = res.data.items.map(function (current, index) {
            return current.volumeInfo;
          });
          this.setState({results: result.slice(0, 15)});
        }
      });
  }
  showResultsHandler() {
    const {searchText} = this.state;
    this.bookRequest(searchText);
    this.setState({listShown: true});
    console.log(this.state.results);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Wpisz nazwę swojej książki"
            style={styles.input}
            onChangeText={(searchText) => this.setState({searchText})}
            value={this.state.searchText}
          />

          <TouchableOpacity
            onPress={() => this.showResultsHandler()}
            style={styles.button}>
            <Text style={styles.buttonText}>Szukaj</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.resultsContainer}
          keyboardShouldPersistTaps="handled">
          {this.state.listShown &&
            this.state.results.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={{margin: 10}}
                  onPress={() => {
                    const book = {
                      title: item.title ? item.title : null,
                      authors: item.authors ? item.authors : null,
                      uri: item.imageLinks ? item.imageLinks.thumbnail : null,
                    };
                    this.props.onResultFound(book);
                    this.setState({searchText: item.title, listShown: false});
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
  }
}
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
    //backgroundColor: 'white',
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
