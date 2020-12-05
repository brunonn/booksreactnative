import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {getColors} from '../../locales/colors';
import Button from '../../components/UI/Button';
import {Input, Spinner} from '../../components/UI';

import {register} from '../../actions/authActions';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';

import * as yup from 'yup';

const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .min(6)
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.auth.pending);
  const registerHandler = ({email, password}) => {
    dispatch(register(email, password));
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your books</Text>
        </View>

        {pending ? (
          <Spinner />
        ) : (
          <View style={{width: '90%', flex: 4, marginBottom: 40}}>
            <Formik
              validationSchema={registerValidationSchema}
              initialValues={{email: '', password: '', confirmPassword: ''}}
              onSubmit={registerHandler}>
              {({
                handleChange,
                handleSubmit,
                errors,
                touched,
                isValid,
                values,
              }) => (
                <>
                  <View style={{flex: 3}}>
                    <Input
                      label="Email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      keyboardType={'email-address'}
                      error={errors.email}
                      touched={touched.email}
                    />
                    <Input
                      label="Password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      secureTextEntry
                      error={errors.password}
                      touched={touched.password}
                    />
                    <Input
                      label="Confirm password"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      secureTextEntry
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                    />
                  </View>

                  <Button
                    buttonStyle={{flex: 1}}
                    title="Register"
                    onPress={handleSubmit}
                    disabled={!isValid}
                  />
                </>
              )}
            </Formik>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColors('background'),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleContainer: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: getColors('whiteFont'),
    fontSize: 30,
    borderColor: getColors('orange'),
    borderBottomWidth: 1,
  },
  bottomTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: getColors('lightFont'),
  },
  buttonsContainer: {},
});

export default RegisterScreen;
