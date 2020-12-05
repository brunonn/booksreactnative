import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {getColors} from '../../locales/colors';
import ImagePicker from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../../components/UI/Button';

import {addOwnBook} from '../../actions/booksActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner';

class CreateOwnBookScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookSource: '',
      title: '',
      authors: '',
    };
  }

  addOwnBookHandler = () => {
    const {userId, addOwnBook, navigation} = this.props;
    const {title, authors, bookSource} = this.state;
    const authorsList = authors.split(',');
    addOwnBook(userId, title, authorsList, bookSource.uri);
    navigation.navigate('Books');
  };

  getPhoto = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        const data = response.data;
        const path = response.data;
        this.setState({
          bookSource: source,
        });
      }
    });
  };
  render() {
    const {pending} = this.props;
    if (pending) {
      return <Spinner />;
    }
    return (
      <View style={styles.container}>
        <Input
          label="Nazwa książki"
          value={this.state.title}
          onChangeText={(title) => this.setState({title})}
        />
        <Input
          label="Autorzy"
          value={this.state.authors}
          onChangeText={(authors) => this.setState({authors})}
        />
        <Text style={styles.info}>Podaj autorów po przecinku</Text>
        <TouchableOpacity
          onPress={() => this.getPhoto()}
          style={styles.imageContainer}>
          {this.state.bookSource ? (
            <Image source={this.state.bookSource} style={styles.uploadBook} />
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon
                name="questioncircleo"
                size={60}
                color={getColors('background')}
              />
              <Text style={styles.info}>Wybierz zdjęcie</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={{paddingHorizontal: 10}}>
          <Button
            orange
            title="Dodaj"
            onPress={() => this.addOwnBookHandler()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  info: {
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 10,
    color: getColors('grey'),
  },
  imageContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBook: {
    height: 100,
    width: 100,
  },
});

CreateOwnBookScreen.propTypes = {
  userId: PropTypes.string,
  pending: PropTypes.bool.isRequired,
  addOwnBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pending: state.books.pending,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, {addOwnBook})(CreateOwnBookScreen);
