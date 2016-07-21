import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';

export default class People extends Component {
  render() {
    return (
      <ScrollView style={styles.root}>
        <Text>People</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});