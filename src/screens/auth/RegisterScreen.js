import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getColors} from '../../colors';
import Button from '../../components/UI/Button';
import {Input} from 'react-native-elements';

import {register} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }
  registerHandler = () => {
    const {register} = this.props;
    const {email, password, confirmPassword} = this.state;
    if (password !== confirmPassword) return;
    register(email, password);
  };
  render() {
    const {email, password, confirmPassword} = this.state;
    return (
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
          />
          <Input
            autoCapitalize="none"
            label="Hasło"
            value={password}
            onChangeText={(password) => this.setState({password})}
            secureTextEntry
          />
          <Input
            autoCapitalize="none"
            label="Potwierdź hasło"
            value={confirmPassword}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            secureTextEntry
          />
        </View>

        <Button
          title="Zarejestruj się"
          onPress={() => this.registerHandler()}
        />
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
RegisterScreen.propTypes = {
  register: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  pending: state.auth.pending,
});

export default connect(mapStateToProps, {register})(RegisterScreen);
