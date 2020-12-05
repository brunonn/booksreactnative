import React from 'react';
import {View, Text} from 'react-native';
import {logout} from '../../actions/authActions';

import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/UI/Button';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);

  return (
    <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
      <Text style={{fontFamily: 'Poppins-Regular', fontSize: 30}}>
        Welcome {user?.displayName}
      </Text>

      <View style={{position: 'absolute', bottom: 10}}>
        <Button
          orange
          title="Edytuj profil"
          onPress={() => navigation.navigate('EditProfile')}
        />

        <Button title="Wyloguj" onPress={() => dispatch(logout())} />
      </View>
    </View>
  );
};

export default ProfileScreen;
