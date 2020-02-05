import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from 'react-native';
import * as Yup from 'yup';

import { Block, Button, Text, Input } from '../components';
import { theme } from '../constants';
import { Formik } from 'formik';
import navigation from '../navigation';

const formValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('Required')
});

const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com') {
        reject(new Error('Duplicate email, please try again.'));
      }
      resolve(true);
    }, 1000);
  });
};
export default class Login extends Component {
  static navigationOptions = {
    // headerShown: false,
    title: ''
  };

  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={formValidationSchema}
          onSubmit={(values, actions) => {
            login({ email: values.email, password: values.password })
              .then(() => {
                // Alert.alert('User Registered successfully!');
                navigation.navigate('Browse');
              })
              .catch(err => {
                actions.setFieldError('general', err.message);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {props => {
            return (
              <Block padding={[0, theme.sizes.base * 2]}>
                <Text h1 bold>
                  Login
                </Text>
                <Block middle>
                  <Input
                    label="Email"
                    style={styles.input}
                    defaultValue={props.values.email}
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                  />
                  <Text style={{ color: 'red' }}>
                    {props.touched.email && props.errors.email}
                  </Text>
                  <Input
                    secure
                    label="Password"
                    style={styles.input}
                    defaultValue={props.values.password}
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    secureTextEntr={true}
                  />
                  <Text style={{ color: 'red' }}>
                    {props.touched.password && props.errors.password}
                  </Text>
                  {props.isSubmitting ? (
                    <ActivityIndicator />
                  ) : (
                    <Button gradient onPress={props.handleSubmit}>
                      <Text bold white center>
                        Login
                      </Text>
                    </Button>
                  )}
                  <Button onPress={() => navigation.navigate('Forgot')}>
                    <Text
                      gray
                      caption
                      center
                      style={{ textDecorationLine: 'underline' }}
                    >
                      Forgot your password?
                    </Text>
                    {
                      <Text style={{ color: 'red' }}>
                        {props.errors.general}
                      </Text>
                    }
                  </Button>
                </Block>
              </Block>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  login: {
    flex: 1,
    justifyContent: 'center'
  }
});
