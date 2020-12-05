import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Colors} from '../../locales/colors';

const Spinner = () => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <ActivityIndicator size="large" color={Colors.orange} />
    </View>
  );
};

export default Spinner;
