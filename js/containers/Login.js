import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { primary } from '../styles/colors';
import FBLogin from '../components/FBLogin';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.root}>
        <FBLogin />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primary,
  },
});