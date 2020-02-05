import React, { Component } from 'react';
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Block, Button, Input, Text } from '../components';
import { theme } from '../constants';

const formSignupValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .test(
      'confirm-password-test',
      'Password and confirm password should match',
      function(value) {
        return value === this.parent.password;
      }
    )
});

const signUp = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com') {
        reject(new Error('Duplicate email, please try again.'));
      }
      resolve(true);
    }, 5000);
  });
};

export default class Signup extends Component {
  static navigationOptions = {
    // headerShown: false,
    title: ''
  };

  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <ScrollView>
          <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={formSignupValidation}
            onSubmit={(values, actions) => {
              signUp({ email: values.email, password: values.password })
                .then(() => {
                  Alert.alert(
                    'Success!',
                    'Your account has been created',
                    [
                      {
                        text: 'Continue',
                        onPress: () => {
                          navigation.navigate('Browse');
                        }
                      }
                    ],
                    {
                      cancelable: false
                    }
                  );
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
                    Sign Up
                  </Text>
                  <Block middle>
                    <Input
                      email
                      label="Email"
                      style={[styles.input]}
                      defaultValue={props.values.email}
                      onChangeText={props.handleChange('email')}
                      onBlur={props.handleBlur('email')}
                    />
                    <Text style={{ color: 'red' }}>
                      {props.touched.email && props.errors.email}
                    </Text>
                    <Input
                      label="Username"
                      style={[styles.input]}
                      defaultValue={props.values.username}
                      onChangeText={props.handleChange('username')}
                      onBlur={props.handleBlur('username')}
                    />
                    <Text style={{ color: 'red' }}>
                      {props.touched.username && props.errors.username}
                    </Text>
                    <Input
                      secure
                      label="Password"
                      style={[styles.input]}
                      defaultValue={props.values.password}
                      onChangeText={props.handleChange('password')}
                      onBlur={props.handleBlur('password')}
                    />
                    <Text style={{ color: 'red' }}>
                      {props.touched.password && props.errors.password}
                    </Text>
                    <Input
                      secure
                      label="Confirm Password"
                      style={[styles.input]}
                      defaultValue={props.values.confirmPassword}
                      onChangeText={props.handleChange('confirmPassword')}
                      onBlur={props.handleBlur('confirmPassword')}
                    />
                    <Text style={{ color: 'red' }}>
                      {props.touched.confirmPassword &&
                        props.errors.confirmPassword}
                    </Text>
                    <Button gradient onPress={props.handleSubmit}>
                      {props.isSubmitting ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text bold white center>
                          Sign Up
                        </Text>
                      )}
                    </Button>
                    <Button onPress={() => navigation.navigate('Welcome')}>
                      <Text
                        gray
                        caption
                        center
                        style={{ textDecorationLine: 'underline' }}
                      >
                        Back to Login
                      </Text>
                    </Button>
                    {
                      <Text style={{ color: 'red' }}>
                        {props.errors.general}
                      </Text>
                    }
                  </Block>
                </Block>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
