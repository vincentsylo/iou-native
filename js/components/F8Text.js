import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text } from 'react-native';
import { fontPrimary } from '../styles/colors';

export default class F8Text extends Component {
  render() {
    const {
      style,
      ...rest,
    } = this.props;

    return <Text style={[styles.root, style]} {...rest} />;
  }
}

const styles = StyleSheet.create({
  root: {
    color: fontPrimary,
  },
});