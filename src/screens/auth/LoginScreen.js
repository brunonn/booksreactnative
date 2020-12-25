import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Colors} from '../../locales/colors';
import {useDispatch, useSelector} from 'react-redux';
import {Spinner, Input, Button} from '../../components/UI';
import {Formik} from 'formik';
import * as yup from 'yup';
import {login} from '../../actions/authActions';

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

const LoginScreen = () => {
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.auth.pending);
  const loginHandler = ({email, password}) => {
    dispatch(login(email, password));
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
              validationSchema={loginValidationSchema}
              initialValues={{email: '', password: ''}}
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
                  <View style={{flex: 1, justifyContent: 'center'}}>
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
                  <View style={{flex: 1, paddingTop: 60}}>
                    <Button
                      orange
                      title="Sign in"
                      onPress={handleSubmit}
                      disabled={!isValid}
                    />
                  </View>
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
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleContainer: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: Colors.whiteFont,
    fontSize: 30,
    borderColor: Colors.orange,
    borderBottomWidth: 1,
  },
  bottomTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: Colors.lightFont,
  },
  buttonsContainer: {},
});

export default LoginScreen;
