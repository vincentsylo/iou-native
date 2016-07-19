import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

@connect(state => ({ user: state.user }))
export default class Launch extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  componentDidMount() {
    if (this.props.user) {
      Actions.home();
    } else {
      Actions.login();
    }
  }

  render() {
    return (
      <View>
        <Text>Launch</Text>
      </View>
    );
  }
}