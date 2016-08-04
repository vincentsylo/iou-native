import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from './F8Text';
import CodePush from 'react-native-code-push';

export default class CodePushControl extends Component {
  static propTypes = {
    syncComplete: PropTypes.func,
  };

  state = {
    syncMessage: '',
    progress: null,
  };

  componentDidMount() {
    CodePush.notifyApplicationReady();

    CodePush.getCurrentPackage().then(() => {
      this.sync();
    });
  }

  async sync() {
    let self = this;
    try {
      return await CodePush.sync(
        {
          installMode: CodePush.InstallMode.IMMEDIATE,
        },
        (syncStatus) => {
          switch(syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
              self.setState({
                syncMessage: 'Checking for update',
              });
              break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
              self.setState({
                syncMessage: 'Downloading package',
              });
              break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
              self.setState({
                syncMessage: 'Awaiting user action',
              });
              break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
              self.setState({
                syncMessage: 'Installing update',
              });
              break;
            case CodePush.SyncStatus.UP_TO_DATE:
              self.setState({
                syncMessage: 'App up to date',
                progress: false,
              }, () => {
                self.props.syncComplete();
              });
              break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
              self.setState({
                syncMessage: 'Update cancelled by user',
                progress: false,
              });
              break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
              self.setState({
                syncMessage: 'Update installed',
                progress: false,
              });
              break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
              self.setState({
                syncMessage: 'An unknown error occurred',
                progress: false,
              }, () => {
                self.props.syncComplete();
              });
              break;
          }
        },
        (progress) => {
          self.setState({
            progress: progress
          });
        }
      );
    } catch (error) {
      CodePush.log(error);
    }
  }

  render() {
    let syncView, progressView;

    if (this.state.syncMessage) {
      syncView = (
        <Text style={styles.messages}>{this.state.syncMessage}</Text>
      );
    }

    if (this.state.progress) {
      progressView = (
        <Text style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
      );
    }

    return (
      <View style={styles.container}>
        {syncView}
        {progressView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
    alignItems: 'center',
  },
  messages: {
    textAlign: 'center',
  },
});
