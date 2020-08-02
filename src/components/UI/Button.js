import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getColors} from '../../colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Button = ({orange, title, onPress, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          ...styles.container,
          backgroundColor: orange ? getColors('orange') : getColors('cyan'),
          buttonStyle,
        }}>
        <Text
          style={{
            ...styles.title,
            color: orange ? getColors('black') : getColors('white'),
            textStyle,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColors('orange'),
    padding: 15,
    marginVertical: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: getColors('black'),
  },
});
export default Button;
