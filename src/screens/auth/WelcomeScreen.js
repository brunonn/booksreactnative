import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../../components/UI';
import {getColors} from '../../locales/colors';

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Twoje Książki</Text>
        </View>
        <View style={{marginTop: 100}}>
          <Text style={styles.bottomTitle}>
            Kolekcjonuj swoje książki i szukaj nowych
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            orange
            title="Zaloguj się"
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            title="Zarejestruj się"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColors('background'),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleContainer: {
    marginTop: 30,
    borderColor: getColors('orange'),
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: getColors('whiteFont'),
    fontSize: 30,
  },
  bottomTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: getColors('lightFont'),
  },
  buttonsContainer: {},
});

export default WelcomeScreen;
