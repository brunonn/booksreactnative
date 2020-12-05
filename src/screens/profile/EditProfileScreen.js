import React, {useState} from 'react';
import {View} from 'react-native';
import {updateProfile} from '../../actions/authActions';

import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/UI/Button';
import {Input} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const EditProfileScreen = () => {
  const user = useSelector((state) => state.auth.user);
  const [displayName, setDisplayName] = useState(user.displayName);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleUpdateProfile = () => {
    dispatch(updateProfile(displayName));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
      <Input
        label="Imię"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
      />

      <View style={{position: 'absolute', bottom: 10}}>
        <Button orange title="Zapisz zmiany" onPress={handleUpdateProfile} />
      </View>
    </View>
  );
};

export default EditProfileScreen;
