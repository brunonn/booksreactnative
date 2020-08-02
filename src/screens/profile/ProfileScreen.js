import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {updateProfile, getDataProfile} from '../../actions/profileActions';
import {logout} from '../../actions/authActions';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {getDataProfile} = this.props;
    getDataProfile();
    this.focusSubscription = this.props.navigation.addListener('focus', () => {
      getDataProfile();
    });
  }
  componentWillUnmount() {
    this.focusSubscription();
  }
  logoutHandler = () => {
    const {logout} = this.props;
    logout();
  };
  editProfileHandler = () => {
    const {navigation} = this.props;
    navigation.navigate('EditProfile');
  };
  render() {
    const {dataProfile, loadingProfileData, updatingProfile} = this.props;
    if (loadingProfileData || updatingProfile) {
      return <Spinner />;
    }

    return (
      <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
        <Text style={{fontFamily: 'Poppins-Regular', fontSize: 30}}>
          Witaj {dataProfile.displayName}
        </Text>
       
        <View style={{position: 'absolute', bottom: 10}}>
          <Button
            orange
            title="Edytuj profil"
            onPress={() => this.editProfileHandler()}
          />

          <Button title="Wyloguj" onPress={() => this.logoutHandler()} />
        </View>
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  getDataProfile: PropTypes.func.isRequired,
  dataProfile: PropTypes.object.isRequired,
  loadingProfileData: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  updatingProfile: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  dataProfile: state.profile.dataProfile,
  loadingProfileData: state.profile.loadingProfileData,
  updatingProfile: state.profile.updatingProfile,
});

export default connect(mapStateToProps, {
  updateProfile,
  logout,
  getDataProfile,
})(ProfileScreen);
