import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {getColors} from '../../colors';
import Button from '../../components/UI/Button';
import {Input} from 'react-native-elements';

import {login} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  loginHandler = () => {
    const {login} = this.props;
    const {email, password} = this.state;
    login(email, password);
  };

  render() {
    const {email, password} = this.state;
    return (
      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Twoje Książki</Text>
          </View>
          <View style={{width: '90%'}}>
            <Input
              autoCapitalize="none"
              label="Email"
              value={email}
              onChangeText={(email) => this.setState({email})}
              inputStyle={{color: getColors('white')}}
            />
            <Input
              autoCapitalize="none"
              label="Hasło"
              value={password}
              onChangeText={(password) => this.setState({password})}
              inputStyle={{color: getColors('white')}}
            />
          </View>
          <Button
            orange
            title="Zaloguj się"
            onPress={() => this.loginHandler()}
          />
        </View>
      </KeyboardAvoidingView>
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
});
LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  pending: state.auth.pending,
});

export default connect(mapStateToProps, {login})(LoginScreen);
