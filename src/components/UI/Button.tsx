import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  ButtonProps as RNButtonProps,
} from 'react-native';
import {Colors} from '../../locales/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ButtonProps extends RNButtonProps {
  orange: boolean;
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({
  orange,
  title,
  onPress,
  buttonStyle,
  textStyle,
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          {backgroundColor: orange ? Colors.orange : Colors.cyan},
          buttonStyle,
        ]}>
        <Text
          style={[
            styles.title,
            {color: orange ? Colors.black : Colors.white},
            textStyle,
          ]}>
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
    backgroundColor: Colors.orange,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: Colors.black,
  },
});
export default Button;
