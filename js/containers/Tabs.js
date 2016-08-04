import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { userSetDeviceToken } from '../actions/user';
import FCM from 'react-native-fcm';
import Drawer from 'react-native-drawer';
import DrawerContent from '../components/DrawerContent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../components/TabBar';
import Header from '../components/Header';
import People from './People';
import Redeem from './Redeem';
import Owe from './Owe';

@connect()
export default class Tabs extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  componentDidMount() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
      this.updateDeviceToken(token);
    });
    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      console.log(notif);
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    });
    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
      this.updateDeviceToken(token);
    });
  }

  componentWillUnmount() {
    // prevent leaking
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }
  
  updateDeviceToken(token) {
    this.props.dispatch(userSetDeviceToken(token));
  }
  
  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    this._drawer.close();
  }

  render() {
    return (
      <View style={styles.root}>
        <Drawer
          tapToClose
          side="right"
          content={<DrawerContent close={::this.closeDrawer} />}
          ref={c => this._drawer = c}
        >
          <Header rightAction={::this.openDrawer} />
          <ScrollableTabView
            initialPage={1}
            tabBarPosition="top"
            renderTabBar={() => <TabBar />}
          >
            <View tabLabel={{ icon: 'book', title: 'Owe' }} style={styles.tabView}>
              <Owe />
            </View>
            <View tabLabel={{ icon: 'users', title: 'People' }} style={styles.tabView}>
              <People />
            </View>
            <View tabLabel={{ icon: 'gift', title: 'Redeem' }} style={styles.tabView}>
              <Redeem />
            </View>
          </ScrollableTabView>
        </Drawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabView: {
    flex: 1,
  },
});
