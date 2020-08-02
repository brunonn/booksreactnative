import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {login, register, logout} from '../actions/authActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  loginWithUserCredentials = (email, password) => {
    this.props.register(email, password);
  };
  logoutUser = () => {
    this.props.logout();
  }

  render() {
    const {email, password} = this.state;
    return (
      <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            width: 300,
            marginVertical: 10,
          }}
          value={email}
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            width: 300,
            marginVertical: 10,
          }}
          value={password}
          onChangeText={(password) => this.setState({password})}
        />
        <TouchableOpacity
          onPress={() => this.loginWithUserCredentials(email, password)}
          style={{
            backgroundColor: 'red',
            borderBottomColor: 'grey',
            borderWidth: 1,
            width: 100,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text>Login</Text>
        </TouchableOpacity>
        {this.props.pending && <Text>Pending</Text>}
        {this.props.isAuth && <Text>Auth</Text>}
        <TouchableOpacity onPress={() => this.logoutUser()}>
          <Text>Wyloguj</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Home.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  pending: state.auth.pending,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {login, register, logout})(Home);
