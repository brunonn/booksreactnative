import React from 'react';
import {Text, StyleSheet, TextInputProps, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../../locales/colors';

interface InputProps extends TextInputProps {
  label: string;
  error: string;
  touched: boolean;
}

const Input = ({label, error, touched, ...props}: InputProps) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput autoCapitalize="none" style={styles.input} {...props} />
        {!!error && touched && <Text style={styles.error}>{error}</Text>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  label: {
    color: Colors.lightGrey,
    fontWeight: '700',
    fontSize: 17,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    marginBottom: 20,
    fontSize: 20,
    color: Colors.white,
  },
  error: {
    top: -15,
    color: Colors.orange,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default Input;
