import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { userLogin } from '../actions/user';
import CodePushControl from '../components/CodePushControl';

@connect(state => ({ user: state.user }))
export default class Launch extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object,
  };

  state = {
    upToDate: false,
    foundUser: false,
  };

  componentWillMount() {
    this.props.dispatch(userLogin());
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.props;

    if (user !== nextProps.user) {
      this.setState({
        foundUser: true,
      }, this.launchApp);
    }
  }

  launchApp() {
    const { upToDate, foundUser } = this.state;
    const { user } = this.props;

    if (upToDate && foundUser) {
      if (_.get(user, 'token')) {
        Actions.tabs({type: 'replace'});
      } else {
        Actions.login({type: 'replace'});
      }
    }
  }

  syncComplete() {
    this.setState({
      upToDate: true,
    }, this.launchApp);
  }

  render() {
    return (
      <View style={styles.root}>
        <ActivityIndicator size="large" />
        <CodePushControl syncComplete={::this.syncComplete} />
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