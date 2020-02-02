import React, { Component } from 'react';
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';

const forgotValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Required')
});

const VALID_EMAIL = 'test@test.com';

export default class Forgot extends Component {
  static navigationOptions = {
    title: ''
  };

  render() {
    const { navigation } = this.props;
    return (
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={forgotValidationSchema}
        onSubmit={(values, actions) => {
          Keyboard.dismiss();
          if (values.email === VALID_EMAIL) {
            Alert.alert(
              'Password Sent!',
              'Please check you email.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('Login');
                  }
                }
              ],
              { cancelable: false }
            );
            actions.setSubmitting(false);
          } else {
            Alert.alert(
              'Error',
              'Please check your Email address.',
              [{ text: 'Try again' }],
              { cancelable: false }
            );
            actions.setSubmitting(false);
          }
        }}
      >
        {props => {
          return (
            <KeyboardAvoidingView style={styles.forgot} behavior="padding">
              <Block padding={[0, theme.sizes.base * 2]}>
                <Text h1 bold>
                  Forgot
                </Text>
                <Block middle>
                  <Input
                    label="Email"
                    style={[styles.input]}
                    defaultValue={props.values.email}
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                  />
                  <Text style={{ color: 'red' }}>
                    {props.touched.email && props.errors.email}
                  </Text>
                  <Button gradient onPress={props.handleSubmit}>
                    {props.isSubmitting ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Text bold white center>
                        Forgot
                      </Text>
                    )}
                  </Button>
                  <Button onPress={() => navigation.navigate('Login')}>
                    <Text
                      gray
                      caption
                      center
                      style={{ textDecorationLine: 'underline' }}
                    >
                      Back to Login
                    </Text>
                  </Button>
                </Block>
              </Block>
            </KeyboardAvoidingView>
          );
        }}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  forgot: {
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
