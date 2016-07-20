import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';

@connect(state => ({ user: state.user }))
export default class Launch extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  componentDidMount() {
    const { user } = this.props;

    if (_.get(user, 'isAuthenticated')) {
      Actions.tabs({ type: 'replace' });
    } else {
      Actions.tabs({ type: 'replace' });
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