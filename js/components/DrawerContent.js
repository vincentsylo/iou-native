import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { primary, fontLight } from '../styles/colors';
import FBLogin from '../components/FBLogin';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DrawerContent extends Component {
  static propTypes = {
    close: PropTypes.func,
  };

  render() {
    return (
      <View style={styles.root}>
        <TouchableOpacity
          onPress={this.props.close}
          style={styles.close}
        >
          <Icon
            name="remove"
            size={25}
            style={styles.icon}
          />
        </TouchableOpacity>
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
  close: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  icon: {
    color: fontLight,
  }
});