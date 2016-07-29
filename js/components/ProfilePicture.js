import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class ProfilePicture extends Component {
  static propTypes = {
    picture: PropTypes.string,
    fbId: PropTypes.string,
  };

  render() {
    const { picture, fbId } = this.props;

    return (
      <TouchableOpacity onPress={() => Actions.profile({ personId: fbId })}>
        <Image source={{ uri: picture }} style={styles.picture} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});