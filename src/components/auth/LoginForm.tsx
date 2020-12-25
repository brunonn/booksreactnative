import {Formik} from 'formik';
import React from 'react';
import {View, Text} from 'react-native';
import {Button, Input} from '../UI';

import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {login} from '../../actions/authActions';
import {TouchableOpacity} from 'react-native-gesture-handler';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

interface LoginForm {
  email: string;
  password: string;
}

const LoginForm = ({onBack}) => {
  const dispatch = useDispatch();
  const loginHandler = ({email, password}: LoginForm) => {
    dispatch(login(email, password));
    //onPress();
  };
  return (
    <View style={{}}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: 'john@example.com', password: 'qwerty'}}
        onSubmit={loginHandler}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          isValid,
          values,
        }) => (
          <>
            <View style={{justifyContent: 'center'}}>
              <View>
                <Input
                  label="Email"
                  value={values.email}
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  keyboardType={'email-address'}
                  error={errors.email}
                  touched={touched.email}
                />
                <Input
                  label="Password"
                  value={values.password}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  error={errors.password}
                  touched={touched.password}
                />
              </View>
            </View>
            <View style={{paddingTop: 60}}>
              <Button
                orange
                title="Sign in"
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>
            <TouchableOpacity onPress={onBack}>
              <Text>Go back</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;
