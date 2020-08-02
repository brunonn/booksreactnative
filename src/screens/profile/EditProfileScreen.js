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
import {Input} from 'react-native-elements';

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
    };
  }
  componentDidMount() {}

  updateProfileHandler = () => {
    const {userId, updateProfile} = this.props;
    updateProfile(userId, this.state.displayName);
    const {navigation} = this.props;
    navigation.goBack();
  };
  render() {
    const {dataProfile, loadingProfileData} = this.props;
    if (loadingProfileData) {
      return <Spinner />;
    }

    return (
      <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
        <Input
          label="Imię"
          value={this.state.displayName}
          onChangeText={(displayName) => this.setState({displayName})}
        />

        <View style={{position: 'absolute', bottom: 10}}>
          <Button
            orange
            title="Zapisz zmiany"
            onPress={() => this.updateProfileHandler()}
          />
        </View>
      </View>
    );
  }
}

EditProfileScreen.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  getDataProfile: PropTypes.func.isRequired,
  dataProfile: PropTypes.object.isRequired,
  loadingProfileData: PropTypes.bool.isRequired,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  dataProfile: state.profile.dataProfile,
  loadingProfileData: state.profile.loadingProfileData,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, {
  updateProfile,

  getDataProfile,
})(EditProfileScreen);
