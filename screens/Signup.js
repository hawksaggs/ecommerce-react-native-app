import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Block, Button, Text } from '../components';

export default class Signup extends Component {
  static navigationOptions = {
    headerShown: false
  };

  render() {
    return (
      <Block middle>
        <Text>SignUp</Text>
      </Block>
    );
  }
}

const styles = StyleSheet.create({});
