import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';

export default class Redeem extends Component {
  render() {
    return (
      <ScrollView style={styles.root}>
        <Text>Owe</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});