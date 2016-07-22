import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fontLight } from '../styles/colors';

export default class Header extends Component {
  static propTypes = {
    rightAction: PropTypes.func,
  };

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.right}>
          <TouchableOpacity onPress={this.props.rightAction}>
            <Icon
              size={25}
              name="cog"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  root: {
    height: 60,
    paddingTop: 10,
    backgroundColor: '#f60',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  icon: {
    color: fontLight,
  },
});

export default Header;