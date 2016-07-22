import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { userLogin } from '../actions/user';

@connect(state => ({ user: state.user }))
export default class Launch extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object,
  };

  componentWillMount() {
    this.props.dispatch(userLogin());
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.props;

    if (user !== nextProps.user) {
      if (_.get(nextProps.user, 'token')) {
        Actions.tabs({type: 'replace'});
      } else {
        Actions.login({type: 'replace'});
      }
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});