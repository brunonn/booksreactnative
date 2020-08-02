import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {isSignedIn, setUserId} from '../actions/authActions';

import {AsyncStorage} from 'react-native';

import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import Spinner from '../components/UI/Spinner';

class AppNavigator extends React.Component {
  componentDidMount() {
    const {isSignedIn} = this.props;
    isSignedIn();
    this._retrieveData();
  }

  _retrieveData = async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value === null) {
        AsyncStorage.clear();
        return;
      }
      this.props.setUserId(value);
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    const {isAuth, pending} = this.props;
    if (pending) return <Spinner />;
    return (
      <NavigationContainer>
        {isAuth && <MainNavigator />}
        {!isAuth && <AuthNavigator />}
      </NavigationContainer>
    );
  }
}

AppNavigator.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  isSignedIn: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  pending: state.auth.pending,
});

export default connect(mapStateToProps, {isSignedIn, setUserId})(AppNavigator);
